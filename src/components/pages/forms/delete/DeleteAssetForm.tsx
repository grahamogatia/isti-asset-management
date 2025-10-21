import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Asset } from "@/data/types";
import { useDeleteAsset } from "@/hooks/useAsset";
import { toast } from "sonner";

interface DeleteAssetFormProps {
  asset: Asset;
}

function DeleteAssetForm({ asset }: DeleteAssetFormProps) {
  const { mutate } = useDeleteAsset();

  const handleDeleteAsset = () => {
    mutate(asset.asset_id as number, {
      onSuccess: () => {
        toast.info("Asset deleted successfully");
      },
      onError: () => {
        toast.error("Failed to delete asset");
      },
    });
  };

  return <DeleteDialog handleConfirm={handleDeleteAsset} />;
}

export default DeleteAssetForm;
