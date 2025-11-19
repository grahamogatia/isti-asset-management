import PopoverForm from "@/components/layout/PopoverForm";
import { Play } from "lucide-react";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { toast } from "sonner";
import { useUpdateRepair } from "@/hooks/useRepair";
import FormPopoverTrigger from "@/components/ui/form-popover-trigger";

// Missing interface definition
interface IsRepairContinuedFormProps {
  repair: Repair;
}

function IsRepairContinuedForm({ repair }: IsRepairContinuedFormProps) {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      ...repair,
      repair_completion_date: undefined,
      remarks: repair.remarks || "", // Fix: Keep existing remarks or empty string
    },
    mode: "all",
  });

  const { mutate } = useUpdateRepair();
  const { getStatuses } = useLookupFunctions();
  const statuses = getStatuses("Repair");

  function onReparContinued(values: Repair) {
    mutate(
      {
        id: values.repair_request_id as number,
        data: {
          status_id: statuses.find((s) => s.status_name === "Under Repair")
            ?.status_id,
          remarks: values.remarks,
        },
      },
      {
        onSuccess: () => {
          toast.success("Repair request has been continued");
        },
      }
    );
  }

  return (
    <PopoverForm
      triggerButton={<FormPopoverTrigger icon={Play} name="Continue Repair"/>}
      title="Continue Repair?"
      form={form}
      onSubmit={onReparContinued}
      submitButtonText="Continue Repair"
      submitButtonIcon={<Play className="mr-2 h-4 w-4" />}
      formId="continue-repair-form"
    >
      <FormFieldTextArea
        control={form.control}
        name="remarks"
        label="Remarks"
        placeholder="Add any remarks for continuing this repair..."
      />
    </PopoverForm>
  );
}

export default IsRepairContinuedForm;
