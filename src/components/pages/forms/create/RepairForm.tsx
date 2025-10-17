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
import { getAsset } from "@/lib/lookups";
import { useAssets } from "@/hooks/useAsset";
import { employees } from "@/testcases/foreignkeys";
import { useUrgencies } from "@/hooks/useUrgency";
import { useAddRepair, useRepairs } from "@/hooks/useRepair";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useIssuances } from "@/hooks/useIssuance";
import { useMemo } from "react";
import { format, isValid } from "date-fns";

function RepairForm() {
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
      urgency_id: undefined,
      status_id: undefined,
      remarks: undefined,
      date_reported: new Date(),
      repair_start_date: new Date(),
      repair_completion_date: undefined,
      repair_cost: 0,
    },
    mode: "all",
  });

  const { mutate } = useAddRepair();
  const { data: assets } = useAssets();
  const { data: repairs } = useRepairs();
  const { data: issuances } = useIssuances();
  const { data: urgencies } = useUrgencies();
  const { getStatuses } = useLookupFunctions();

  const selectedUserId = form.watch("user_id");
  const assetId = form.watch("asset_id");
  const asset = getAsset(assetId);
  const statuses = getStatuses("Repair");
  const repairMinDate =
    asset && asset.purchase_date ? new Date(asset.purchase_date) : undefined;

  const userAssets = useMemo(() => {
    if (!selectedUserId || !assets || !issuances) return [];

    // Blocklist status ids for Repair
    const blockedStatusIds = new Set(
      (statuses ?? [])
        .filter((s) =>
          ["Under Repair", "On Hold", "Rejected"].includes(s.status_name)
        )
        .map((s) => s.status_id)
    );
    const uid = Number(selectedUserId);

    // All asset ids issued to the selected user
    const userAssetIds = (issuances ?? [])
      .filter((iss) => Number(iss.user_id) === uid)
      .map((iss) => iss.asset_id)
      .filter((id): id is number => typeof id === "number");

    // Helper: is this asset currently repairable?
    const isRepairable = (assetId: number) => {
      const entries = (repairs ?? []).filter((r) => r.asset_id === assetId);
      if (entries.length === 0) return true; // no repair entries yet
      // include only if NONE of the entries have a blocked status
      return entries.every((r) => !blockedStatusIds.has(r.status_id as number));
    };

    const allowedIds = new Set(userAssetIds.filter(isRepairable));

    // Return asset objects for the combobox
    return (assets ?? []).filter((a) => allowedIds.has(a.asset_id as number));
  }, [selectedUserId, assets, issuances, repairs, statuses]);

  function onSubmit(values: Repair) {
    console.log("🎉 SUCCESS! Form submitted:", values);

    mutate({
      ...values,
      status_id: statuses.find((s) => s.status_name === "Under Repair")
        ?.status_id,
      date_reported: format(values.date_reported, "yyyy-MM-dd"),
      repair_start_date: format(values.repair_start_date, "yyyy-MM-dd"),
    });
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
            label="Reported By"
            employees={employees}
            form={form}
          />
          <FormFieldAssetCombobox // Display only user's issued items
            control={form.control}
            name="asset_id"
            label="Asset Requiring Repair"
            assets={userAssets}
            form={form}
          />
          <FormFieldDate
            control={form.control}
            name="date_reported"
            label="Date Reported"
            placeholder="Select a date"
            minDate={repairMinDate}
            maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
          />
        </FormCardContent>
        <FormCardContent title="Request">
          <FormFieldSelect
            control={form.control}
            name="urgency_id"
            label="Urgency"
            placeholder="Select urgency level"
          >
            {urgencies &&
              urgencies.map((urgency) => (
                <SelectItem value={String(urgency.urgency_id)}>
                  {urgency.urgency_level}
                </SelectItem>
              ))}
          </FormFieldSelect>
          <FormFieldDate
            control={form.control}
            name="repair_start_date"
            label="Repair Start Date"
            placeholder="Select a date"
            minDate={repairMinDate}
            maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
          />
          <FormFieldMoney
            control={form.control}
            name="repair_cost"
            label="Repair Cost"
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
            // onClick={() =>
            //   console.log("Repair form values:", form.getValues())
            // }
          >
            <Plus />
            Create Repair Request
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RepairForm;
