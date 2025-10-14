import IssuanceForm from "@/components/pages/forms/create/IssuanceForm";
import { DataTable } from "@/components/ui/data-table";
import {
  def_issuance_columns,
  issuance_columns,
  issuance_filters,
} from "@/data/issuance_columns";
import { useIssuances } from "@/hooks/useIssuance";

function Issuance() {
  const { data: issuances } = useIssuances();

  return (
    <div className="mx-auto w-full border rounded-xl py-3.5 p-5">
      <DataTable
        columns={issuance_columns}
        data={issuances ?? []}
        defaultVisibleColumns={def_issuance_columns}
        filterableColumns={issuance_filters}
        type="Issuance"
        form={<IssuanceForm />}
      />
    </div>
  );
}

export default Issuance;
