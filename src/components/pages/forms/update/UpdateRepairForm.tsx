import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { employees } from "@/testcases/foreignkeys";
import { SelectItem } from "@/components/ui/select";
import FormFieldSelect from "../fields/FormFieldSelect";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldMoney from "../fields/FormFieldMoney";

import DisplayAsset from "@/components/ui/display-asset";
import DisplayEmployee from "@/components/ui/display-employee";
import DisplayField from "@/components/layout/DisplayField";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useUpdateRepair } from "@/hooks/useRepair";
import { compareObjects } from "@/lib/utils";
import { useUrgencies } from "@/hooks/useUrgency";
import { toast } from "sonner";

interface UpdateRepairFormProps {
  repair: Repair;
}

function UpdateRepairForm({ repair }: UpdateRepairFormProps) {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      ...repair,
    },
    mode: "all",
  });

  // Compute asset and minDate before return
  const { mutate } = useUpdateRepair();
  const { data: urgencies } = useUrgencies();
  const { getAsset, getCategoryName, getSubCategoryName, getTypeName } =
    useLookupFunctions();
  const assetId = form.watch("asset_id");
  const asset = getAsset(assetId);

  const userId = form.watch("user_id") || repair.user_id;
  const employee = employees.find((emp) => emp.user_id === userId);
  const dateReported = form.watch("date_reported");
  const minRepairStartDate = dateReported ? new Date(dateReported) : undefined;

  function onSubmit(values: Repair) {
    const changed = compareObjects(repair, values);
    console.log("🎉 SUCCESS! Repair updated:", repair, values, changed);

    if (Object.values(changed).length === 0) return;

    mutate(
      {
        id: values.repair_request_id as number,
        data: changed,
      },
      {
        onSuccess: () => {
          toast.success("Successfully added new Repair Request");
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        id="update-repair-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Details">
          <DisplayField name="asset_name" label="Asset Name">
            <DisplayAsset
              asset_name={asset?.asset_name as string}
              category={getCategoryName(asset?.category_id as number)}
              sub_category={getSubCategoryName(
                asset?.sub_category_id as number
              )}
              type={getTypeName(asset?.type_id as number)}
            />
          </DisplayField>

          <DisplayField name="user_id" label="Reported By">
            {employee ? (
              <DisplayEmployee employee={employee} />
            ) : (
              <span className="text-muted-foreground">Employee not found</span>
            )}
          </DisplayField>

          <FormFieldDate
            control={form.control}
            name="date_reported"
            label="Date Reported"
            placeholder="Select a date"
            maxDate={new Date()}
          />
        </FormCardContent>
        <FormCardContent title="Request">
          <FormFieldSelect
            control={form.control}
            name="urgency_id"
            label="Urgency"
            placeholder="Select urgency level"
          >
            {urgencies?.map((urgencyItem) => (
              <SelectItem
                key={urgencyItem.urgency_id}
                value={String(urgencyItem.urgency_id)}
              >
                {urgencyItem.urgency_level}
              </SelectItem>
            ))}
          </FormFieldSelect>
          <FormFieldDate
            control={form.control}
            name="repair_start_date"
            label="Repair Start Date"
            placeholder="Select a date"
            minDate={minRepairStartDate}
            maxDate={new Date()}
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
            form="update-repair-form"
            // onClick={() =>
            //   console.log("Form errors:", form.formState.errors)
            // }
          >
            <Save className="mr-2 h-4 w-4" />
            Update Repair Request
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateRepairForm;
