import { DataTable } from "@/components/ui/data-table";
import { def_issuance_columns, issuance_columns, issuance_filters } from "@/data/issuance_columns";
import { issuance_testcases } from "@/testcases/issuances";

function Issuance() {
  return (
    <div className="mx-auto w-full border rounded-xl py-3.5 p-5">
       <DataTable
        columns={issuance_columns}
        data={issuance_testcases}
        defaultVisibleColumns={def_issuance_columns}
        filterableColumns={issuance_filters}
        type="Issuance"
        form="Form"
      /> 
    </div>
  );
}

export default Issuance;
