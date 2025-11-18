import PopoverForm from "@/components/layout/PopoverForm";
import { format } from "date-fns";
import { Pause } from "lucide-react";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { toast } from "sonner";
import { useUpdateRepair } from "@/hooks/useRepair";
import FormPopverTrigger from "@/components/ui/form-popover-trigger";

// Missing interface definition
interface IsOnHoldFormProps {
  repair: Repair;
}

function IsOnHoldForm({ repair }: IsOnHoldFormProps) {
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

  function onRepairOnHold(values: Repair) {
    mutate(
      {
        id: values.repair_request_id as number,
        data: {
          status_id: statuses.find((s) => s.status_name === "On Hold")
            ?.status_id,
          remarks: values.remarks,
        },
      },
      {
        onSuccess: () => {
          toast.info("Repair request has been put on hold");
        },
      }
    );
  }

  return (
    <PopoverForm
      triggerButton={
        <FormPopverTrigger icon={Pause} name="Put Repair On Hold?" />
      }
      title="Put Repair On Hold?"
      subtitle={
        <>
          🛠️ Start Date:{" "}
          <span className="font-semibold">
            {format(repair.repair_start_date as Date, "MMM dd, yyyy")}
          </span>
        </>
      }
      form={form}
      onSubmit={onRepairOnHold}
      submitButtonText="Put On Hold"
      submitButtonIcon={<Pause className="mr-2 h-4 w-4" />}
      formId="onhold-repair-form"
    >
      <FormFieldTextArea
        control={form.control}
        name="remarks"
        label="Reason for Hold"
        placeholder="Explain why this repair is being put on hold..."
      />
    </PopoverForm>
  );
}

export default IsOnHoldForm;
