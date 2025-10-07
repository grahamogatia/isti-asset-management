import { BorrowSchema } from "@/data/schemas";
import type { Borrow } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../form-fields/FormFieldTextArea";
import FormFieldDate from "../form-fields/FormFieldDate";
import FormFieldNumber from "../form-fields/FormFieldNumber";
import { asset_testcases } from "@/testcases/assets";
import FormFieldAssetCombobox from "../form-fields/FormFieldAssetCombobox";
import FormFieldUserCombobox from "../form-fields/FormFieldUserCombobox";
import { employees } from "@/testcases/foreignkeys";

function BorrowForm() {
  const form = useForm<Borrow>({
    resolver: zodResolver(BorrowSchema),
    defaultValues: {
      asset_id: undefined,
      category_id: 1,
      user_id: undefined,
      department_id: 1,
      date_borrowed: new Date(),
      asset_condition_id: 1,
      borrow_transaction_id: 1,
      company_id: 1,
      sub_category_id: 1,
      type_id: 1,
      due_date: undefined,
      return_date: undefined,
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
        <FormCardContent title="Details">
          <FormFieldAssetCombobox
            control={form.control}
            name="asset_id"
            label="Asset to Borrow"
            assets={asset_testcases}
            form={{ ...form }}
          />
          <FormFieldUserCombobox
            control={form.control}
            name="user_id"
            label="Borrowed By"
            employees={employees}
            form={{ ...form }}
          />
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
            placeholder="Enter remarks"
          />
        </FormCardContent>
        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-md"
            type="submit"
            form="borrow-form"
          >
            <Plus />
            Create Borrow Request
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BorrowForm;
