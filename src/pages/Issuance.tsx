import DisplayTabsByStatus from "@/components/layout/DisplayTabsByStatus";
import IssuanceForm from "@/components/pages/forms/create/IssuanceForm";
import { DataTable } from "@/components/ui/data-table";
import {
  def_issuance_columns,
  issuance_filters,
  useIssuanceColumns,
} from "@/data/issuance_columns";
import type { Tab } from "@/data/types";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import { useIssuances } from "@/hooks/useIssuance";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useMemo, useState } from "react";

const ISSUANCE_TABS: Tab[] = [
  { label: "All", value: "All" },
  { label: "Pulled Out", value: "Pulled Out" },
];

function Issuance() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const { issuance_columns } = useIssuanceColumns();
  const { data: issuances } = useIssuances();
  const { getStatusIdGivenStatusName } = useLookupFunctions();
  const pulledOutId = getStatusIdGivenStatusName("Issuance", "Pulled Out");

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "issuance-column-visibility",
    issuance_columns,
    def_issuance_columns
  )

  const displayedIssuances = useMemo(() => {
    if (selectedStatus === "Pulled Out") {
      return issuances?.filter(
        (issuance) => issuance.status_id === pulledOutId
      );
    } else {
      return issuances;
    }
  }, [issuances, selectedStatus, pulledOutId]);

  return (
    <DisplayTabsByStatus
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      tabs={ISSUANCE_TABS}
    >
      <DataTable
        columns={issuance_columns}
        data={displayedIssuances ?? []}
        defaultVisibleColumns={def_issuance_columns}
        filterableColumns={issuance_filters}
        type="Issuance"
        form={<IssuanceForm />}
        columnVisibility={columnVisibility}
        onColumnVisibilityChange={setColumnVisibility}
      />
    </DisplayTabsByStatus>
  );
}

export default Issuance;
