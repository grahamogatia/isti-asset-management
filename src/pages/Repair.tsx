import DisplayTabsByStatus from "@/components/layout/DisplayTabsByStatus";
import RepairForm from "@/components/pages/forms/create/RepairForm";
import { DataTable } from "@/components/ui/data-table";
import {
  def_repair_columns,
  repair_filters,
  useRepairColumns,
} from "@/data/repair_columns";
import type { Tab } from "@/data/types";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
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

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "repair-column-visibility",
    repair_columns,
    def_repair_columns
  )

  const displayedRepairs = useMemo(() => {
    if (selectedStatus === "Completed") {
      return repairs?.filter((repair) => repair.status_id === completedId);
    } else {
      // Selected status is All
      return repairs;
    }
  }, [repairs, selectedStatus, completedId]);


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
