import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { format } from "date-fns/format";
import { ArchiveRestore } from "lucide-react";
import FormFieldDate from "../form-fields/FormFieldDate";
import FormFieldTextArea from "../form-fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssuanceSchema } from "@/data/schemas";
import type { Issuance } from "@/data/types";

interface isWtihdrawnFormProps {
  issuance: Issuance;
  onIssueCompleted?: (updatedIssuance: Issuance) => void;
}

function IsWithdrawnForm({ issuance, onIssueCompleted }: isWtihdrawnFormProps) {
  const form = useForm<Issuance>({
    resolver: zodResolver(IssuanceSchema),
    defaultValues: {
      ...issuance,
      pullout_date: new Date(),
      remarks: "",
    },
    mode: "all",
  });

  return (
    <PopoverForm
      triggerButton={
        <Button variant="outline">
          <ArchiveRestore />
        </Button>
      }
      title="Is Withdrawn?"
      description="Set the pullout date and add final remarks for this issuance."
      form={form}
      onSubmit={(values) => onIssueCompleted?.(values)}
      submitButtonText="Mark as Returned"
      submitButtonIcon={<ArchiveRestore className="mr-2 h-4 w-4" />}
      formId="complete-repair-form"
      subtitle={
        <>
          📦 Issued On:{" "}
          <span className="font-semibold">
            {format(new Date(issuance.issuance_date), "MMM dd, yyyy")}
          </span>
        </>
      }
    >
      <FormFieldDate
        control={form.control}
        name="pullout_date"
        label="Pullout Date"
        placeholder="Select pullout date"
        minDate={new Date(issuance.issuance_date)}
        maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
      />

      <FormFieldTextArea
        control={form.control}
        name="remarks"
        label="Final Remarks"
        placeholder="Add pullout notes and final remarks..."
      />
    </PopoverForm>
  );
}

export default IsWithdrawnForm;
