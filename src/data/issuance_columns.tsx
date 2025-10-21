import { type ColumnDef } from "@tanstack/react-table";
import type { Issuance } from "./types";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import {
  createHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";
import IsWithdrawnForm from "@/components/pages/forms/sub-forms/IsWithdrawn";
import { useCommonColumns } from "./common_columns";
import { ButtonGroup } from "@/components/ui/button-group";
import DeleteIssuanceForm from "@/components/pages/forms/delete/DeleteIssuanceForm";

export function useIssuanceColumns() {
  const commonColumns = useCommonColumns<Issuance>();
  const { getStatusName } = useLookupFunctions();

  const issuance_columns: ColumnDef<Issuance>[] = [
    // Asset identification first
    commonColumns.asset_name(),
    commonColumns.employee(),
    commonColumns.serial_number(),
    commonColumns.category(),
    commonColumns.sub_category(),
    commonColumns.type(),
    commonColumns.simpleColumn("issuance_id", "Issuance ID"),
    {
      accessorKey: "status",
      accessorFn: (row) => {
        return getStatusName(row.status_id as number);
      },
      header: createHeaderWithIcon("status", "Status"),
      cell: ({ row }) => {
        return getStatusName(row.original.status_id as number);
      },
      filterFn: createStandardFilterFn((row) =>
        getStatusName(row.original.status_id)
      ),
    },
    commonColumns.dateColumn("issuance_date", "Issuance Date"),
    commonColumns.dateColumn("pullout_date", "Pullout Date"),
    commonColumns.department(),
    commonColumns.company(),
    commonColumns.simpleColumn("remarks", "Remarks"),
    {
      id: "actions",
      cell: ({ row }) => {
        const isPulledOut = row.original.pullout_date != null;
        return (
          <ButtonGroup className="hidden sm:flex">
            {!isPulledOut && <IsWithdrawnForm issuance={row.original} />}
            <DeleteIssuanceForm issuance={row.original}/>
          </ButtonGroup>
        );
      },
    },
  ];

  return { issuance_columns };
}

export const def_issuance_columns = [
  "asset_name",
  "serial_number",
  "status",
  "issuance_date",
  "pullout_date",
  "employee",
  "department",
  "actions",
];

export const issuance_filters = [
  "category",
  "company",
  "department",
  "status",
  "sub_category",
  "type",
];