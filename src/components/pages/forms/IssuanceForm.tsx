import { IssuanceSchema } from "@/data/schemas";
import type { Issuance } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";

function IssuanceForm() {
  const form = useForm<Issuance>({
    resolver: zodResolver(IssuanceSchema),
    defaultValues: {
      asset_id: 1,
      category_id: 1,
      user_id: 1,
      department_id: 1,
      issuance_date: "",
      pullout_date: "",
      status_id: 1,
      remarks: "",
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
        <FormCardContent title="Issue Item">
          <p>Asset</p>
        </FormCardContent>
        <FormCardContent title="To User">
          <p>User</p>
        </FormCardContent>
        <div className="pb-6">
          <Button
            className="w-full h-10 items-center rounded-md pb-1"
            type="submit"
            form="borrow-form"
          >
            <Plus />
            Record Issuance
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default IssuanceForm;
