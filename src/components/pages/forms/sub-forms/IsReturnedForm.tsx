import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { format } from "date-fns/format";
import { RotateCcw } from "lucide-react";
import FormFieldDate from "../form-fields/FormFieldDate";
import FormFieldTextArea from "../form-fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BorrowSchema } from "@/data/schemas";
import type { Borrow } from "@/data/types";
import { differenceInDays } from "date-fns/differenceInDays";
import { isAfter } from "date-fns/isAfter";

interface isReturnedFormProps {
  borrow: Borrow;
  onReturnCompleted?: (updatedBorrow: Borrow) => void;
}

function IsReturnedForm({
  borrow,
  onReturnCompleted,
}: isReturnedFormProps) {
  const form = useForm<Borrow>({
    resolver: zodResolver(BorrowSchema),
    defaultValues: {
      ...borrow,
      return_date: new Date(),
      remarks: "",
    },
    mode: "all",
  });

  const dueDate = new Date(borrow.due_date);
  const today = new Date();

  const overdue = isAfter(today, dueDate);
  const daysDiff = Math.abs(differenceInDays(today, dueDate));

  return (
    <PopoverForm
      triggerButton={
        <Button variant="outline">
          <RotateCcw />
        </Button>
      }
      title="Is Returned?"
      description="Set the return date and add final remarks for this borrow."
      form={form}
      onSubmit={(values) => onReturnCompleted?.(values)}
      submitButtonText="Mark as Returned"
      submitButtonIcon={<RotateCcw className="mr-2 h-4 w-4" />}
      formId="complete-repair-form"
      subtitle={
        overdue ? (
          <span className="text-red-600 font-semibold">
            ⏰ Overdue by {daysDiff} {daysDiff === 1 ? "day" : "days"}
          </span>
        ) : (
          <>
            📅 Due On:{" "}
            <span className="font-semibold">
              {format(dueDate, "MMM dd, yyyy")}
            </span>
          </>
        )
      }
    >
      <FormFieldDate
        control={form.control}
        name="return_date"
        label="Return Date"
        placeholder="Select return date"
        minDate={new Date(borrow.date_borrowed)}
        maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
      />

      <FormFieldTextArea
        control={form.control}
        name="remarks"
        label="Final Remarks"
        placeholder="Add return notes and final remarks..."
      />
    </PopoverForm>
  );
}

export default IsReturnedForm; 
