import BorrowForm from "@/components/pages/forms/BorrowForm";
import { DataTable } from "@/components/ui/data-table";
import {
  borrow_columns,
  borrow_filters,
  def_borrow_columns,
} from "@/data/borrow_columns";
import { borrow_testcases } from "@/testcases/borrows";

function Borrow() {
  return (
    <div className="mx-auto w-full border rounded-xl py-3.5 p-5">
      <DataTable
        columns={borrow_columns}
        data={borrow_testcases}
        defaultVisibleColumns={def_borrow_columns}
        filterableColumns={borrow_filters}
        type="Borrow"
        form={<BorrowForm />}
      />
    </div>
  );
}

export default Borrow;
