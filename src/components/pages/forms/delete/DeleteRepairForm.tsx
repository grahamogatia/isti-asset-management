import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Repair } from "@/data/types";
import { useDeleteRepair } from "@/hooks/useRepair";
import { toast } from "sonner";

interface DeleteRepairFormProps {
  repair: Repair;
}

function DeleteRepairForm({ repair }: DeleteRepairFormProps) {
  const { mutate } = useDeleteRepair();

  const handleDeleteRepair = () => {
    mutate(repair.repair_request_id as number, {
      onSuccess: () => {
        toast.info("Repair request deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete repair request");
      },
    });
  };

  return <DeleteDialog handleConfirm={handleDeleteRepair} />;
}

export default DeleteRepairForm;
