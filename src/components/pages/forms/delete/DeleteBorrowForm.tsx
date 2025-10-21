import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Borrow } from "@/data/types";
import { useDeleteBorrow } from "@/hooks/useBorrow";
import { toast } from "sonner";

interface DeleteBorrowFormProps {
  borrow: Borrow;
}

function DeleteBorrowForm({ borrow }: DeleteBorrowFormProps) {
  const { mutate } = useDeleteBorrow();

  const handleDeleteBorrow = () => {
    mutate(borrow.borrow_transaction_id as number, {
      onSuccess: () => {
        toast.info("Borrow request deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete borrow request");
      },
    });
  };

  return <DeleteDialog handleConfirm={handleDeleteBorrow} />;
}

export default DeleteBorrowForm;
