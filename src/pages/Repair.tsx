import RepairForm from "@/components/pages/forms/create/RepairForm";
import { DataTable } from "@/components/ui/data-table";
import {
  def_repair_columns,
  repair_columns,
  repair_filters,
} from "@/data/repair_columns";
import { useRepairs } from "@/hooks/useRepair";

function Repair() {
  const {data: repairs, isLoading} = useRepairs(); 
  console.log("Console Log", repairs);
  return (
    <div className="mx-auto w-full border rounded-xl py-3.5 p-5">
      <DataTable
        columns={repair_columns}
        data={repairs ?? []}
        defaultVisibleColumns={def_repair_columns}
        filterableColumns={repair_filters}
        type="Repair"
        form={<RepairForm />}
      />
    </div>
  );
}

export default Repair;
