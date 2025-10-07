import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { format } from "date-fns/format";
import { Hammer } from "lucide-react";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RepairSchema } from "@/data/schemas";
import type { Repair } from "@/data/types";

// Missing interface definition
interface isRepairedFormProps {
  repair: Repair;
  onRepairCompleted?: (updatedRepair: Repair) => void;
}

function IsRepairedForm({ repair, onRepairCompleted }: isRepairedFormProps) {
  const form = useForm<Repair>({
    resolver: zodResolver(RepairSchema),
    defaultValues: {
      ...repair,
      repair_completion_date: new Date(),
      remarks: repair.remarks || "", // Fix: Keep existing remarks or empty string
    },
    mode: "all",
  });

  return (
    <PopoverForm
      triggerButton={
        <Button variant="outline">
          {" "}
          {/* Fix: Add size prop */}
          <Hammer />
        </Button>
      }
      title="Is Repaired?"
      description="Set the completion date and add final remarks for this repair."
      subtitle={
        <>
          🛠️ Start Date: <span className="font-semibold">{format(repair.repair_start_date as Date, "MMM dd, yyyy")}</span>
        </>
      }
      form={form}
      onSubmit={(values) => onRepairCompleted?.(values)}
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
