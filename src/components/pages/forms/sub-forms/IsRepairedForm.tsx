import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Hammer } from "lucide-react";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { toast } from "sonner";
import { useUpdateRepair } from "@/hooks/useRepair";

interface isRepairedFormProps {
  repair: Repair;
}

function IsRepairedForm({ repair }: isRepairedFormProps) {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      ...repair,
      repair_completion_date: new Date(),
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
          status_id: statuses.find((s) => s.status_name === "Completed")?.status_id,
          repair_completion_date: values.repair_completion_date, 
          remarks: values.remarks
        },
      },
      {
        onSuccess: () => {
          toast.success("Successfully updated repair request");
        },
      }
    )
  }

  return (
    <PopoverForm
      triggerButton={
        <Button variant="outline">
          <Hammer />
        </Button>
      }
      title="Is Repaired?"
      subtitle={
        <>
          🛠️ Start Date: <span className="font-semibold">{format(repair.repair_start_date as Date, "MMM dd, yyyy")}</span>
        </>
      }
      form={form}
      onSubmit={onRepairCompleted}
      submitButtonText="Complete"
      submitButtonIcon={<Hammer className="mr-2 h-4 w-4" />}
      formId="complete-repair-form"
    >
      <FormFieldDate
        control={form.control}
        name="repair_completion_date"
        label="Completion Date"
        placeholder="Select completion date"
        minDate={repair.repair_start_date}
        maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
      />

      <FormFieldTextArea
        control={form.control}
        name="remarks"
        label="Final Remarks"
        placeholder="Add completion notes and final remarks..."
      />
    </PopoverForm>
  );
}

export default IsRepairedForm;
