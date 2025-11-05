import FormCardContent from "@/components/layout/FormCardContent";
import { InsuranceSchema } from "@/data/schemas";
import type { Insurance } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { compareObjects } from "@/lib/utils";
import { toast } from "sonner";
import { useUpdateInsurance } from "@/hooks/useInsurance";

interface UpdateInsuranceFormProps {
  insurance: Insurance;
}

function UpdateInsuranceForm({ insurance }: UpdateInsuranceFormProps) {
  const form = useForm<Insurance>({
    resolver: zodResolver(InsuranceSchema),
    defaultValues: {
      ...insurance,
    },
    mode: "all",
  });

  const { mutate } = useUpdateInsurance();

  function onSubmit(values: Insurance) {
    const changed = compareObjects(insurance, values);

    if (Object.values(changed).length === 0) {
      toast.info("No changes detected. Please make edits to uopdate.");
      return;
    }

    console.log(changed);

    mutate(
      {
        id: values.insurance_id as number,
        data: changed,
      },
    );
    console.log("🎉 SUCCESS! Form submitted:", values);
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
            <Save />
            Save Insurance
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateInsuranceForm;
