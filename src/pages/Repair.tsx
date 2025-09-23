import { DataTable } from "@/components/ui/data-table";
import { def_repair_columns, repair_columns } from "@/data/repair_columns";
import { repair_testcases } from "@/testcases/repairs";

function Repair() {
    return (
        <div className="mx-auto w-full border rounded-xl py-3.5 p-5">
            <DataTable 
                columns={repair_columns} 
                data={repair_testcases} 
                defaultVisibleColumns={def_repair_columns}
            />
        </div>
    );
}

export default Repair;