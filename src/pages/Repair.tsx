import DisplayTabsByStatus from "@/components/layout/DisplayTabsByStatus";
import RepairForm from "@/components/pages/forms/create/RepairForm";
import { DataTable } from "@/components/ui/data-table";
import { TabsContent } from "@/components/ui/tabs";
import {
  def_repair_columns,
  repair_filters,
  useRepairColumns,
} from "@/data/repair_columns";
import type { Tab } from "@/data/types";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useRepairs } from "@/hooks/useRepair";
import { useMemo, useState } from "react";

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

  return (
    <DisplayTabsByStatus
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      tabs={REPAIR_TABS}
    >
      {REPAIR_TABS.map((t) => (
        <TabsContent
          key={t.value}
          value={t.value}
          className="mx-auto w-full border rounded-xl py-3.5 p-5"
        >
          <DataTable
            columns={repair_columns}
            data={displayedRepairs ?? []}
            defaultVisibleColumns={def_repair_columns}
            filterableColumns={repair_filters}
            type="Repair"
            form={<RepairForm />}
          />
        </TabsContent>
      ))}
    </DisplayTabsByStatus>
  );
}

export default Repair;
