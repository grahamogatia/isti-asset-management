import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { SelectItem } from "@/components/ui/select";
import FormFieldSelect from "../fields/FormFieldSelect";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldMoney from "../fields/FormFieldMoney";
import FormFieldAssetCombobox from "../fields/FormFieldAssetCombobox";
import FormFieldUserCombobox from "../fields/FormFieldUserCombobox";
import { useAssets } from "@/hooks/useAsset";
import { employees } from "@/testcases/foreignkeys";
import { useUrgencies } from "@/hooks/useUrgency";
import { useAddRepair, useRepairs } from "@/hooks/useRepair";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useIssuances } from "@/hooks/useIssuance";
import { useMemo } from "react";
import { format } from "date-fns";

interface RepairFormProps {
  onSuccess?: () => void;
}

function RepairForm({ onSuccess }: RepairFormProps) {
  // FIX: correct prop typing and return type
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      repair_request_id: undefined,
      asset_id: undefined,
      category_id: undefined,
      sub_category_id: undefined,
      type_id: undefined,
      user_id: undefined,
      department_id: undefined,
      company_id: undefined,
      issue: undefined,
      urgency_id: 4,
      status_id: undefined,
      remarks: undefined,
      date_reported: new Date(),
      repair_start_date: new Date(),
      repair_completion_date: undefined,
      repair_cost: undefined,
    },
    mode: "all",
  });

  const { mutate } = useAddRepair();
  const { data: assets } = useAssets();
  const { data: repairs } = useRepairs();
  const { data: issuances } = useIssuances();
  const { data: urgencies } = useUrgencies();
  const { getStatuses, getStatusIdGivenStatusName, getAsset } =
    useLookupFunctions();

  const selectedUserId = form.watch("user_id");
  const assetId = form.watch("asset_id");
  const asset = getAsset(assetId);
  const statuses = getStatuses("Repair");
  const repairMinDate =
    asset && asset.purchase_date ? new Date(asset.purchase_date) : undefined;

  const userAssets = useMemo(() => {
    if (!selectedUserId || !assets || !issuances) return [];
    const blockedStatusIds = new Set(
      (statuses ?? [])
        .filter((s) =>
          ["Under Repair", "On Hold", "Rejected"].includes(s.status_name)
        )
        .map((s) => s.status_id)
    );
    const uid = Number(selectedUserId);
    const deletedStatusId = getStatusIdGivenStatusName(
      "Asset Inventory",
      "Deleted"
    );
    const userAssetIds = (issuances ?? [])
      .filter((iss) => Number(iss.user_id) === uid)
      .map((iss) => iss.asset_id)
      .filter((id): id is number => typeof id === "number");
    const isRepairable = (assetId: number) => {
      const entries = (repairs ?? []).filter((r) => r.asset_id === assetId);
      if (entries.length === 0) return true;
      return entries.every((r) => !blockedStatusIds.has(r.status_id as number));
    };
    const allowedIds = new Set(userAssetIds.filter(isRepairable));
    return (assets ?? []).filter(
      (a) =>
        allowedIds.has(a.asset_id as number) && a.status_id !== deletedStatusId
    );
  }, [selectedUserId, assets, issuances, repairs, statuses]);

  function onSubmit(values: Repair) {
    mutate(
      {
        ...values,
        // ensure numbers if your selects return strings:
        asset_id: values.asset_id ? Number(values.asset_id) : undefined,
        user_id: values.user_id ? Number(values.user_id) : undefined,
        urgency_id: values.urgency_id ? Number(values.urgency_id) : undefined,
        status_id: statuses.find((s) => s.status_name === "Under Repair")
          ?.status_id,
        date_reported: format(values.date_reported, "yyyy-MM-dd"),
        repair_start_date: format(values.repair_start_date, "yyyy-MM-dd"),
      },
      {
        onSuccess: () => {
          onSuccess?.();
          form.reset();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        id="repair-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Details">
          <FormFieldUserCombobox
            control={form.control}
            name="user_id"
            label="Reported By *"
            employees={employees}
            form={form}
          />
          <FormFieldAssetCombobox
            control={form.control}
            name="asset_id"
            label="Asset Requiring Repair *"
            assets={userAssets}
            form={form}
          />
          <FormFieldDate
            control={form.control}
            name="date_reported"
            label="Date Reported *"
            placeholder="Select a date"
            minDate={repairMinDate}
            maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
          />
        </FormCardContent>

        <FormCardContent title="Request">
          <FormFieldSelect
            control={form.control}
            name="urgency_id"
            label="Urgency *"
            placeholder="Select urgency level"
          >
            {urgencies?.map((urgency) => (
              <SelectItem
                key={urgency.urgency_id} // FIX: add key
                value={String(urgency.urgency_id)} // if your component emits strings
              >
                {urgency.urgency_level}
              </SelectItem>
            ))}
          </FormFieldSelect>

          <FormFieldDate
            control={form.control}
            name="repair_start_date"
            label="Repair Start Date *"
            placeholder="Select a date"
            minDate={repairMinDate}
            maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
          />
          <FormFieldMoney
            control={form.control}
            name="repair_cost"
            label="Repair Cost *"
            placeholder="0.00"
          />
          <FormFieldTextArea
            control={form.control}
            name="issue"
            label="Issue"
            placeholder="Describe the problem in detail"
          />
        </FormCardContent>

        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-md"
            type="submit"
            form="repair-form"
          >
            <Plus />
            Repair Request
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RepairForm;
