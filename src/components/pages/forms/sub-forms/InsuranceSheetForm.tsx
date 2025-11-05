import FormCardContent from "@/components/layout/FormCardContent";
import { InsuranceSchema } from "@/data/schemas";
import type { Insurance } from "@/data/types";
import { useAddInsurance } from "@/hooks/useInsurance";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

function InsuranceSheetForm() {
  const form = useForm<Insurance>({
    resolver: zodResolver(InsuranceSchema),
    defaultValues: {
      insurance_id: undefined,
      insurance_name: "",
      insurance_coverage: "",
      insurance_date_from: new Date(),
      insurance_date_to: undefined,
    },
    mode: "all",
  });

  const { mutate } = useAddInsurance();

  function onSubmit(values: Insurance) {
    mutate({
      ...values,
      insurance_date_from: format(values.insurance_date_from, "yyy-MM-dd"),
      insurance_date_to: format(values.insurance_date_to, "yyy-MM-dd"),
    });
  }

  return (
    <Form {...form}>
      <form
        id="insurance-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Details">
          <FormFieldText
            control={form.control}
            name="insurance_name"
            label="Name"
            placeholder="Enter Name"
          />

          <FormFieldTextArea
            control={form.control}
            name="insurance_coverage"
            label="Coverage"
            placeholder="Enter Description"
          />

          <div className="flex w-full justify-between gap-2">
            <FormFieldDate
              control={form.control}
              name="insurance_date_from"
              label="Date From"
              minDate={new Date("2000-01-01")}
              maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
            />
            <FormFieldDate
              control={form.control}
              name="insurance_date_to"
              label="Date To"
              minDate={
                form.watch("insurance_date_from")
                  ? new Date(form.watch("insurance_date_from"))
                  : new Date()
              }
              maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
            />
          </div>
        </FormCardContent>
        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-md"
            type="submit"
            form="insurance-form"
            // onClick={() => {
            //   console.log("Borrow form values:", form.getValues());
            //   console.log("Form values:", form.getValues());
            //   console.log("Form errors:", form.formState.errors);
            // }}
          >
            <Plus />
            Insurance
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default InsuranceSheetForm;
