import { type ColumnDef } from "@tanstack/react-table";
import type { Issuance } from "./types";
import { commonColumns } from "./common_columns";
import { getStatusName } from "@/lib/lookups";
import {
  createHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";
import ActionsButtonGroup from "@/components/ui/actions-button-group";
import IsWithdrawnForm from "@/components/pages/forms/sub-forms/IsWithdrawn";

export const issuance_columns: ColumnDef<Issuance>[] = [
  // Asset identification first
  commonColumns.asset_name<Issuance>(),
  commonColumns.employee<Issuance>(),
  commonColumns.serial_number<Issuance>(),
  commonColumns.category<Issuance>(),
  commonColumns.sub_category<Issuance>(),
  commonColumns.type<Issuance>(),
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
  commonColumns.dateColumn<Issuance>("issuance_date", "Issuance Date"),
  commonColumns.dateColumn<Issuance>("pullout_date", "Pullout Date"),
  commonColumns.department<Issuance>(),
  commonColumns.company<Issuance>(),
  commonColumns.simpleColumn<Issuance>("remarks", "Remarks"),

  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <ActionsButtonGroup 
        type="Issuance"
        showUpdate={false} 
      >
        <IsWithdrawnForm issuance={row.original} />
      </ActionsButtonGroup>
      );
    },
  },
];

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
