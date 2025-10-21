import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Repair } from "@/data/types";
import { useDeleteRepair } from "@/hooks/useRepair";

interface DeleteRepairFormProps {
  repair: Repair;
}

function DeleteRepairForm({ repair }: DeleteRepairFormProps) {
  
  const { mutate } = useDeleteRepair();

  const handleDeleteRepair = () => {
    mutate(repair.repair_request_id as number);
  }

  return (
    <DeleteDialog handleConfirm={handleDeleteRepair}/>
  );
}

export default DeleteRepairForm;
