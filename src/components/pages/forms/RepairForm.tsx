import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "./form-fields/FormFieldTextArea";
import { urgency } from "@/testcases/foreignkeys";
import { SelectItem } from "@/components/ui/select";
import FormFieldSelect from "./form-fields/FormFieldSelect";
import FormFieldDate from "./form-fields/FormFieldDate";
import FormFieldMoney from "./form-fields/FormFieldMoney";

function RepairForm() {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      repair_request_id: 1,
      asset_id: 1,
      category_id: 1,
      sub_category_id: 1,
      type_id: 1,
      user_id: 1,
      department_id: 1,
      company_id: 1,
      issue: "",
      urgency_id: undefined,
      status_id: 1,
      remarks: "",
      date_reported: "",
      repair_start_date: "",
      repair_completion_date: "",
      repair_cost: 0,
    },
    mode: "all",
  });

  function onSubmit(values: Repair) {
    console.log("🎉 SUCCESS! Form submitted:", values);
  }

  return (
    <Form {...form}>
      <form
        id="repair-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent
        title="Repair Details"
        >
            <p>Test</p>
        </FormCardContent>
        <FormCardContent
        title="Request"
        >
            <FormFieldTextArea
            control={form.control}
            name="issue"
            label="Issue"
            placeholder="Enter issue"
            />
            <FormFieldSelect
            control={form.control}
            name="urgency_id"
            label="Urgency"
            placeholder="Select urgency level"
            >
                {urgency.map((urgency) => (
                    <SelectItem value={String(urgency.urgency_id)}>
                        {urgency.urgency_name}
                    </SelectItem>
                ))}
            </FormFieldSelect>
            <FormFieldDate
            control={form.control}
            name="repair_start_date"
            label="Repair Start Date"/>
            <FormFieldMoney
            control={form.control}
            name="repair_cost"
            label="Repair Cost"
            placeholder="Enter Cost"
            />
        </FormCardContent>

        <div className="pb-6">
          <Button
            className="w-full h-10 items-center rounded-md pb-1"
            type="submit"
            form="repair-form"
          >
            <Plus />
            Report Repair
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default RepairForm;
