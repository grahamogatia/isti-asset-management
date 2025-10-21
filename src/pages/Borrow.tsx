import DisplayTabsByStatus from "@/components/layout/DisplayTabsByStatus";
import BorrowForm from "@/components/pages/forms/create/BorrowForm";
import { DataTable } from "@/components/ui/data-table";
import { TabsContent, TabsTrigger } from "@/components/ui/tabs";
import {
  borrow_filters,
  def_borrow_columns,
  useBorrowColumns,
} from "@/data/borrow_columns";
import type { Tab } from "@/data/types";
import { useBorrows } from "@/hooks/useBorrow";
import { useMemo, useState } from "react";

const BORROW_TABS: Tab[] = [
  { label: "All", value: "All" },
  { label: "Returned", value: "Returned" },
];

function Borrow() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const { borrow_columns } = useBorrowColumns();
  const { data: borrows } = useBorrows();

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
      {BORROW_TABS.map((t) => (
        <TabsContent
          key={t.value}
          value={t.value}
          className="mx-auto w-full border rounded-xl py-3.5 p-5"
        >
          <DataTable
            columns={borrow_columns}
            data={displayedBorrows ?? []}
            defaultVisibleColumns={def_borrow_columns}
            filterableColumns={borrow_filters}
            type="Borrow"
            form={<BorrowForm />}
          />
        </TabsContent>
      ))}
    </DisplayTabsByStatus>
  );
}

export default Borrow;
