import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormFieldText from "../fields/FormFieldText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsuranceSchema } from "@/data/schemas";
import type { Insurance } from "@/data/types";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import PopoverForm from "@/components/layout/PopoverForm";
import { useAddInsurance } from "@/hooks/useInsurance";
import { format } from "date-fns";

export function InsuranceForm() {
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

    mutate(
      {
        ...values,
        insurance_date_from: format(values.insurance_date_from, "yyy-MM-dd"),
        insurance_date_to: format(values.insurance_date_to, "yyy-MM-dd")
      }
    );
  }

  return (
    <PopoverForm
      triggerButton={
        <Button variant="ghost" className="hover:underline">
          <Plus className="mr-2 h-4 w-4" />
          Add Insurance
        </Button>
      }
      title="Insurance"
      description="Enter the insurance details below to add coverage for your assets."
      form={form}
      onSubmit={onSubmit}
      submitButtonText="Insurance"
      submitButtonIcon={<Plus className="mr-2 h-4 w-4" />}
      formId="insurance-form"
    >
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
    </PopoverForm>
  );
}
