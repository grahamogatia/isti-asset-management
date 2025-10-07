import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../form-fields/FormFieldTextArea";
import { employees, urgency } from "@/testcases/foreignkeys";
import { SelectItem } from "@/components/ui/select";
import FormFieldSelect from "../form-fields/FormFieldSelect";
import FormFieldDate from "../form-fields/FormFieldDate";
import FormFieldMoney from "../form-fields/FormFieldMoney";
import FormFieldUserCombobox from "../form-fields/FormFieldUserCombobox";
import {
  getAsset,
  getCategoryName,
  getSubCategoryName,
  getTypeName,
} from "@/lib/lookups";
import DisplayAsset from "@/components/ui/display-asset";
import { Label } from "@/components/ui/label";
import { getColumnIcon } from "@/lib/columnNameUtils";

interface UpdateRepairFormProps {
  repair: Repair;
  onUpdate?: (updatedRepair: Repair) => void;
}

function UpdateRepairForm({ repair, onUpdate }: UpdateRepairFormProps) {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      ...repair,
    },
    mode: "all",
  });

  function onSubmit(values: Repair) {
    console.log("🎉 SUCCESS! Repair updated:", values);
    onUpdate?.(values);
  }

  // Compute asset and minDate before return
  const assetId = form.watch("asset_id");
  const asset = getAsset(assetId);
  const repairMinDate =
    asset && asset.purchase_date ? new Date(asset.purchase_date) : undefined;

  const IconComponent = getColumnIcon("asset_name");

  return (
    <Form {...form}>
      <form
        id="update-repair-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Details">
          <div className="space-y-2">
            <Label className="flex items-center">
              <IconComponent className="h-4 w-4" />
              Asset Name
            </Label>
            <div className="border border-[#5d5bd0] bg-[#f1f1fb] rounded-md p-3 ">
              <DisplayAsset
                asset_name={asset?.asset_name as string}
                category={getCategoryName(asset?.category_id as number)}
                sub_category={getSubCategoryName(
                  asset?.sub_category_id as number
                )}
                type={getTypeName(asset?.type_id as number)}
              />
            </div>
          </div>
          <FormFieldUserCombobox
            control={form.control}
            name="user_id"
            label="Reported By"
            employees={employees}
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
            {urgency.map((urgencyItem) => (
              <SelectItem
                key={urgencyItem.urgency_id}
                value={String(urgencyItem.urgency_id)}
              >
                {urgencyItem.urgency_name}
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

        <div className="pb-6 space-y-2">
  {/* Debug button - remove in production */}
  <Button
    type="button"
    variant="outline"
    onClick={() => {
      console.log("🐛 DEBUG INFO:");
      console.log("   Current form values:", form.getValues());
      console.log("   Form errors:", form.formState.errors);
      console.log("   Is form valid:", form.formState.isValid);
      console.log("   Original repair:", repair);
    }}
  >
    Debug Form State
  </Button>

  <Button
    className="w-full flex items-center justify-center rounded-md"
    type="submit"
    form="update-repair-form"
  >
    <Plus className="mr-2 h-4 w-4" />
    Update Repair Request
  </Button>
</div>
      </form>
    </Form>
  );
}

export default UpdateRepairForm;
