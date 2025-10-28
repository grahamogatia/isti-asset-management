import DisplayTabsByStatus from "@/components/layout/DisplayTabsByStatus";
import RepairForm from "@/components/pages/forms/create/RepairForm";
import { DataTable } from "@/components/ui/data-table";
import {
  def_repair_columns,
  repair_filters,
  useRepairColumns,
} from "@/data/repair_columns";
import type { Tab } from "@/data/types";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useRepairs } from "@/hooks/useRepair";
import type { VisibilityState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

const REPAIR_TABS: Tab[] = [
  { label: "All", value: "All" },
  { label: "Completed", value: "Completed" },
];

function Repair() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const { data: repairs } = useRepairs();
  const { repair_columns } = useRepairColumns();
  const { getStatusIdGivenStatusName } = useLookupFunctions();
  const completedId = getStatusIdGivenStatusName("Repair", "Completed");

  const displayedRepairs = useMemo(() => {
    if (selectedStatus === "Completed") {
      return repairs?.filter((repair) => repair.status_id === completedId);
    } else {
      // Selected status is All
      return repairs;
    }
  }, [repairs, selectedStatus, completedId]);

  const defaultVisibleColumns = def_repair_columns;
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const saved = localStorage.getItem("repair-column-visibility");
      if (saved) return JSON.parse(saved);

      // Create initial visibility from defaultVisibleColumns
      const initial: VisibilityState = {};
      repair_columns.forEach((col: any) => {
        const key = col.accessorKey || col.id;
        if (key) initial[key] = defaultVisibleColumns.includes(key);
      });
      return initial;
    }
  );

  useEffect(() => {
    localStorage.setItem(
      "repair-column-visibility",
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility]);

  return (
    <DisplayTabsByStatus
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      tabs={REPAIR_TABS}
    >
      <DataTable
        columns={repair_columns}
        data={displayedRepairs ?? []}
        defaultVisibleColumns={def_repair_columns}
        filterableColumns={repair_filters}
        type="Repair"
        form={<RepairForm />}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </DisplayTabsByStatus>
  );
}

export default Repair;
