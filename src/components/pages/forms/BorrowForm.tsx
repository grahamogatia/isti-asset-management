import { BorrowSchema, RepairSchema } from "@/data/schemas";
import type { Borrow, Repair } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "./form-fields/FormFieldTextArea";
import FormFieldDate from "./form-fields/FormFieldDate";
import FormFieldNumber from "./form-fields/FormFieldNumber";

function BorrowForm() {
  const form = useForm<Borrow>({
    resolver: zodResolver(BorrowSchema),
    defaultValues: {
      asset_id: 1,
      category_id: 1,
      user_id: 1,
      department_id: 1,
      date_borrowed: String(new Date()),
      asset_condition_id: 1,
      borrow_transaction_id: 1,
      company_id: 1,
      sub_category_id: 1,
      type_id: 1,
      due_date: "",
      return_date: "",
      duration: undefined,
      remarks: "",
    },
    mode: "all",
  });

  function onSubmit(values: Borrow) {
    console.log("🎉 SUCCESS! Form submitted:", values);
  }

  return (
    <Form {...form}>
      <form
        id="borrow-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Borrow Details">
          <p>Test</p>
        </FormCardContent>
        <FormCardContent title="Record">
          <FormFieldDate
          control={form.control}
          name="date_borrowed"
          label="Date Borrowed"
          />
          <FormFieldNumber
          control={form.control}
          name="duration"
          label="Duration (days)"
          placeholder="Enter duration in days"
          />
          <FormFieldTextArea
          control={form.control}
          name="remarks"
          label="Remarks"
          placeholder="Enter Remarks"
          />
        </FormCardContent>
        <div className="pb-6">
          <Button
            className="w-full h-10 items-center rounded-md pb-1"
            type="submit"
            form="borrow-form"
          >
            <Plus />
            Add Asset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BorrowForm;
