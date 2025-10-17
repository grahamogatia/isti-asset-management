import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Ban } from "lucide-react";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { toast } from "sonner";
import { useUpdateRepair } from "@/hooks/useRepair";

interface isRejectedFormProps {
  repair: Repair;
}

function IsRejectedForm({ repair }: isRejectedFormProps) {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      ...repair,
      remarks: repair.remarks || "", // Fix: Keep existing remarks or empty string
    },
    mode: "all",
  });

  const { mutate } = useUpdateRepair();
  const { getStatuses } = useLookupFunctions();
  const statuses = getStatuses("Repair");

  function onRepairCompleted(values: Repair) {
    mutate(
      {
        id: values.repair_request_id as number,
        data: {
          status_id: statuses.find((s) => s.status_name === "Rejected")
            ?.status_id,
          remarks: values.remarks,
        },
      },
      {
        onSuccess: () => {
          toast.info("Repair request has been rejected");
        },
      }
    );
  }

  return (
    <PopoverForm
      triggerButton={
        <Button variant="outline">
          <Ban />
        </Button>
      }
      title="Reject Repair?"
      subtitle={
        <>
          🛠️ Reported:{" "}
          <span className="font-semibold">
            {format(repair.date_reported as Date, "MMM dd, yyyy")}
          </span>
        </>
      }
      form={form}
      onSubmit={onRepairCompleted}
      submitButtonText="Reject"
      submitButtonIcon={<Ban className="mr-2 h-4 w-4" />}
      submitButtonVariant="destructive"
      formId="reject-repair-form"
    >
      <FormFieldTextArea
        control={form.control}
        name="remarks"
        label="Rejection Reason"
        placeholder="Explain why this repair request is being rejected..."
      />
    </PopoverForm>
  );
}

export default IsRejectedForm;
