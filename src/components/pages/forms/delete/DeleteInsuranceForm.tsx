import DeleteDialog from "@/components/layout/DeleteDialog";
import type { Insurance } from "@/data/types";
import { useDeleteInsurance } from "@/hooks/useInsurance";
import { toast } from "sonner";

interface DeleteInsuranceFormProps {
    insurance: Insurance;
}

function DeleteInsuranceForm({ insurance }: DeleteInsuranceFormProps) {

    const { mutate } = useDeleteInsurance();

    const handleDeleteInsurance = () => {
        mutate(insurance.insurance_id as number, {
            onSuccess: () => {
                toast.info("Insurance deleted successfully");
            },
            onError: () => {
                toast.error("Failed to delete insurance");
            }
        })
    }

    return (
        <DeleteDialog handleConfirm={handleDeleteInsurance}/>
    );
}

export default DeleteInsuranceForm;