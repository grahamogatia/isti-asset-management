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

function RepairForm() {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      repair_request_id: 1,
      asset_id: undefined,
      category_id: 1,
      sub_category_id: 1,
      type_id: 1,
      user_id: undefined,
      department_id: 1,
      company_id: 1,
      issue: "",
      urgency_id: undefined,
      status_id: 1,
      remarks: "",
      date_reported: new Date(),
      repair_start_date: new Date(),
      repair_completion_date: undefined,
      repair_cost: 0,
    },
    mode: "all",
  });

  function onSubmit(values: Repair) {
    console.log("🎉 SUCCESS! Form submitted:", values);
  }

  // Compute asset and minDate before return
  const { data: assets } = useAssets();
  const { data: urgencies } = useUrgencies();
  const assetId = form.watch("asset_id");
  const asset = getAsset(assetId);
  const repairMinDate =
    asset && asset.purchase_date ? new Date(asset.purchase_date) : undefined;

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
            form={{ ...form }}
          />
          <FormFieldAssetCombobox
            control={form.control}
            name="asset_id"
            label="Asset Requiring Repair"
            assets={assets ?? []}
            form={{ ...form }}
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
