import BorrowForm from "@/components/pages/forms/create/BorrowForm";
import { DataTable } from "@/components/ui/data-table";
import {
  borrow_filters,
  def_borrow_columns,
  useBorrowColumns,
} from "@/data/borrow_columns";
import { useBorrows } from "@/hooks/useBorrow";

function Borrow() {

  const { borrow_columns } = useBorrowColumns();
  const { data: borrows } = useBorrows();

  return (
    <div className="mx-auto w-full border rounded-xl py-3.5 p-5">
      <DataTable
        columns={borrow_columns}
        data={borrows ?? []}
        defaultVisibleColumns={def_borrow_columns}
        filterableColumns={borrow_filters}
        type="Borrow"
        form={<BorrowForm />}
      />
    </div>
  );
}

export default Borrow;
