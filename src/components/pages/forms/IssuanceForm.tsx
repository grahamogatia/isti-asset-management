import { IssuanceSchema } from "@/data/schemas";
import type { Issuance } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import { asset_testcases } from "@/testcases/assets";
import { employees } from "@/testcases/foreignkeys";
import FormFieldUserCombobox from "./form-fields/FormFieldUserCombobox";
import FormFieldAssetCombobox from "./form-fields/FormFieldAssetCombobox";

function IssuanceForm() {
  const form = useForm<Issuance>({
    resolver: zodResolver(IssuanceSchema),
    defaultValues: {
      asset_id: undefined,
      category_id: 1,
      user_id: undefined,
      department_id: 1,
      issuance_date: undefined,
      pullout_date: undefined,
      status_id: 1,
      remarks: undefined,
      issuance_id: 1,
      sub_category_id: 1,
      type_id: 1,
      company_id: 1,
    },
    mode: "all",
  });

  function onSubmit(values: Issuance) {
    console.log("🎉 SUCCESS! Form submitted:", values);
  }

  return (
    <Form {...form}>
      <form
        id="borrow-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Asset Details">
          <FormFieldAssetCombobox
            control={form.control}
            name="asset_id"
            label="Asset to Issue"
            assets={asset_testcases}
            form={{ ...form }}
          />
        </FormCardContent>
        <FormCardContent title="Recipient Information">
          <FormFieldUserCombobox
            control={form.control}
            name="user_id"
            label="Issue To"
            employees={employees}
            form={{ ...form }}
          />
        </FormCardContent>
        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-md"
            type="submit"
            form="borrow-form"
          >
            <Plus />
            Create Issuance Request
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default IssuanceForm;
