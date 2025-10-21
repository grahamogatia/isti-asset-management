import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Issuance } from "@/data/types";
import { useDeleteIssuance } from "@/hooks/useIssuance";
import { toast } from "sonner";

interface DeleteIssuanceFormProps {
  issuance: Issuance;
}

function DeleteIssuanceForm({ issuance }: DeleteIssuanceFormProps) {
  const { mutate } = useDeleteIssuance();

  const handleDeleteIssuance = () => {
    mutate(issuance.issuance_id as number, {
      onSuccess: () => {
        toast.info("Issuance deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete issuance");
      },
    });
  };

  return <DeleteDialog handleConfirm={handleDeleteIssuance} />;
}

export default DeleteIssuanceForm;
