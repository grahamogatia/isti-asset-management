import DisplayTabsByStatus from "@/components/layout/DisplayTabsByStatus";
import { DataTable } from "@/components/ui/data-table";
import { useInsuranceColumns } from "@/data/insurance_columns";
import type { Tab } from "@/data/types";
import { useInsurances } from "@/hooks/useInsurance";
import { useMemo, useState } from "react";
import InsuranceSheetForm from "../forms/sub-forms/InsuranceSheetForm";

const INSURANCE_TABS: Tab[] = [
  { label: "All", value: "All" },
  { label: "Expired", value: "Expired" },
];

function InsurancePage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const insurance_columns = useInsuranceColumns();
  const { data: insurances } = useInsurances();

  const displayedInsurances = useMemo(() => {
    if (!insurances) return [];

    const today = new Date();

    if (selectedStatus === "Expired") {
      return insurances.filter((insurance) => {
        const dateTo = insurance.insurance_date_to;
        if (!dateTo) return false;
        const dt = new Date(dateTo);
        return !isNaN(dt.getTime()) && dt < today;
      });
    }

    // default: show all
    return insurances;
  }, [insurances, selectedStatus]);

  return (
    <>
      <h1 className="font-semibold tracking-tight text-zinc-950 pb-4">
        Insurance Management
      </h1>

      <DisplayTabsByStatus
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        tabs={INSURANCE_TABS}
      >
        <DataTable
          columns={insurance_columns}
          data={displayedInsurances ?? []}
          type="Insurance"
          form={<InsuranceSheetForm/>}
          placeholder="Search insurance..."
        />
      </DisplayTabsByStatus>
    </>
  );
}

export default InsurancePage;
