import PopoverForm from "@/components/layout/PopoverForm";
import { format } from "date-fns/format";
import { ArchiveRestore } from "lucide-react";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IssuanceSchema } from "@/data/schemas";
import type { Issuance } from "@/data/types";
import { isValid } from "date-fns";
import { useUpdateIssuance } from "@/hooks/useIssuance";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import FormPopverTrigger from "@/components/ui/form-popover-trigger";

interface isWtihdrawnFormProps {
  issuance: Issuance;
}

function IsWithdrawnForm({ issuance }: isWtihdrawnFormProps) {
  const form = useForm<Issuance>({
    resolver: zodResolver(IssuanceSchema),
    defaultValues: {
      ...issuance,
      pullout_date: new Date(),
      remarks: "",
    },
    mode: "all",
  });

  const { mutate } = useUpdateIssuance();
  const { getStatuses } = useLookupFunctions();

  const statuses = getStatuses("Issuance");
  const issuanceDate = issuance.issuance_date
    ? new Date(issuance.issuance_date)
    : undefined;
  const validIssuanceDate =
    issuanceDate && isValid(issuanceDate) ? issuanceDate : undefined;

  function onIssueCompleted(values: Issuance) {
    mutate({
      id: values.issuance_id as number,
      data: {
        pullout_date: values.pullout_date,
        remarks: values.remarks,
        status_id: statuses.find((s) => s.status_name === "Pulled Out")
          ?.status_id,
      },
    });
  }

  return (
    <PopoverForm
      triggerButton={
        <FormPopverTrigger icon={ArchiveRestore} name="Is Withdrawn?" />
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
            {issuance.issuance_date
              ? format(new Date(issuance.issuance_date), "MMM dd, yyyy")
              : "N/A"}
          </span>
        </>
      }
    >
      <FormFieldDate
        control={form.control}
        name="pullout_date"
        label="Pullout Date"
        placeholder="Select pullout date"
        minDate={validIssuanceDate}
        maxDate={new Date()}
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
