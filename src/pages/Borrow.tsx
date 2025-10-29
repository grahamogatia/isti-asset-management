import DisplayTabsByStatus from "@/components/layout/DisplayTabsByStatus";
import BorrowForm from "@/components/pages/forms/create/BorrowForm";
import { DataTable } from "@/components/ui/data-table";
import {
  borrow_filters,
  def_borrow_columns,
  useBorrowColumns,
} from "@/data/borrow_columns";
import type { Tab } from "@/data/types";
import { useBorrows } from "@/hooks/useBorrow";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { useMemo, useState } from "react";

const BORROW_TABS: Tab[] = [
  { label: "All", value: "All" },
  { label: "Returned", value: "Returned" },
];

function Borrow() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const { borrow_columns } = useBorrowColumns();
  const { data: borrows } = useBorrows();

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "borrow-column-visibility",
    borrow_columns,
    def_borrow_columns
  )

  const displayedBorrows = useMemo(() => {
    if (selectedStatus === "Returned") {
      return borrows?.filter((borrow) => borrow.return_date != null);
    } else {
      return borrows;
    }
  }, [borrows, selectedStatus]);

 
  return (
    <DisplayTabsByStatus
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      tabs={BORROW_TABS}
    >
      <DataTable
        columns={borrow_columns}
        data={displayedBorrows ?? []}
        defaultVisibleColumns={def_borrow_columns}
        filterableColumns={borrow_filters}
        type="Borrow"
        form={<BorrowForm />}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </DisplayTabsByStatus>
  );
}

export default Borrow;
