import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { format, isValid, differenceInDays, isAfter } from "date-fns";
import { RotateCcw } from "lucide-react";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BorrowSchema } from "@/data/schemas";
import type { Borrow } from "@/data/types";
import { useUpdateBorrow } from "@/hooks/useBorrow";
import { toast } from "sonner";

interface IsReturnedFormProps {
  borrow: Borrow;
}

const toValidDate = (d: unknown): Date | undefined => {
  if (d === null || d === undefined || d === "") return undefined;
  const dt = new Date(d as any);
  return isValid(dt) ? dt : undefined;
};

function IsReturnedForm({ borrow }: IsReturnedFormProps) {
  const defaultReturnDate = toValidDate(borrow.return_date) ?? new Date();
  const dateBorrowed = toValidDate(borrow.date_borrowed);
  const dueDate = toValidDate(borrow.due_date);

  const form = useForm<Borrow>({
    resolver: zodResolver(BorrowSchema),
    defaultValues: {
      ...borrow,
      return_date: defaultReturnDate,
      remarks: (borrow as Partial<Borrow>).remarks ?? "",
    } as Borrow,
    mode: "all",
  });


  const { mutate } = useUpdateBorrow();

  const today = new Date();
  const overdue = dueDate ? isAfter(today, dueDate) : false;
  const daysDiff = dueDate ? Math.abs(differenceInDays(today, dueDate)) : 0;

  function onReturnCompleted(values: Borrow) {
    mutate(
      {
        id: values.borrow_transaction_id as number,
        data: {
          return_date: values.return_date,
          remarks: values.remarks
        }
      },
      {
        onSuccess: () => {
          toast.success("Successfully returned asset")
        } 
      },
    )
  }

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
      onSubmit={onReturnCompleted}
      submitButtonText="Mark as Returned"
      submitButtonIcon={<RotateCcw className="mr-2 h-4 w-4" />}
      formId="complete-return-form"
      subtitle={
        dueDate ? (
          overdue ? (
            <span className="text-red-600 font-semibold">
              ⏰ Overdue by {daysDiff} {daysDiff === 1 ? "day" : "days"}
            </span>
          ) : (
            <>
              📅 Due On:{" "}
              <span className="font-semibold">{format(dueDate, "MMM dd, yyyy")}</span>
            </>
          )
        ) : (
          <span className="font-semibold">Due date unknown</span>
        )
      }
    >
      <FormFieldDate
        control={form.control}
        name="return_date"
        label="Return Date"
        placeholder="Select return date"
        minDate={dateBorrowed}
        maxDate={new Date()}
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