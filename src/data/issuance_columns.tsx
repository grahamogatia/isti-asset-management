import { type ColumnDef } from "@tanstack/react-table";
import type { Issuance } from "./types";
import { commonColumns } from "./common_columns";
import { getStatusName } from "@/lib/lookups";

export const issuance_columns: ColumnDef<Issuance>[] = [

  commonColumns.asset_name<Issuance>(),
  commonColumns.category<Issuance>(),
  commonColumns.employee<Issuance>(),
  commonColumns.department<Issuance>(),
  commonColumns.dateColumn<Issuance>("issuance_date", "Issuance Date"),
  commonColumns.dateColumn<Issuance>("pullout_date", "Pullout Date"),
  {
    accessorKey: "status",
    accessorFn: (row) => {
          return getStatusName(row.status_id);
        },
        header: "Status",
        cell: ({ row }) => {
          return getStatusName(row.original.status_id);
        }
  },
  commonColumns.simpleColumn<Issuance>("remarks", "Remarks"),
  commonColumns.simpleColumn<Issuance>("issuance_id", "Issuance ID"),
  commonColumns.sub_category<Issuance>(),
  commonColumns.type<Issuance>(),
  commonColumns.company<Issuance>(),
  commonColumns.actions<Issuance>(),
];

export const def_issuance_columns = [
  "asset_name",
  "category",
  "employee",
  "department",
  "issuance_date",
  "pullout_date",
  "status",
  "remarks",
  "actions",
];
