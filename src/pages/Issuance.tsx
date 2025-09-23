import { DataTable } from "@/components/ui/data-table";
import { issuance_columns } from "@/data/issuance_columns";
import { def_repair_columns } from "@/data/repair_columns";
import { issuance_testcases } from "@/testcases/issuances";

function Issuance() {
  return (
    <div className="mx-auto w-full border rounded-xl py-3.5 p-5">
      <DataTable
        columns={issuance_columns}
        data={issuance_testcases}
        defaultVisibleColumns={def_repair_columns}
      />
    </div>
  );
}

export default Issuance;
