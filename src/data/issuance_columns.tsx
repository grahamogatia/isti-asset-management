import { type ColumnDef } from "@tanstack/react-table";
import type { Issuance } from "./types";
import { commonColumns } from "./common_columns";
import { getStatusName } from "@/lib/lookups";
import { createHeaderWithIcon } from "@/lib/columnNameUtils";

export const issuance_columns: ColumnDef<Issuance>[] = [
  // Asset identification first
  commonColumns.asset_name<Issuance>(),
  commonColumns.serial_number<Issuance>(),
  commonColumns.category<Issuance>(),
  commonColumns.sub_category<Issuance>(),
  commonColumns.type<Issuance>(),
  commonColumns.simpleColumn("issuance_id", "Issuance ID"),
  {
    accessorKey: "status",
    accessorFn: (row) => {
      return getStatusName(row.status_id);
    },
    header: createHeaderWithIcon("status", "Status"),
    cell: ({ row }) => {
      return getStatusName(row.original.status_id);
    },
    filterFn: (row, _columnId, filterValue) => {
      const rowValue = getStatusName(row.original.status_id);
      // If filterValue is an array, check if rowValue is included
      if (Array.isArray(filterValue)) {
        return filterValue.includes(rowValue);
      }
      // If single value, do exact match
      return rowValue === filterValue;
    },
  },
  commonColumns.dateColumn<Issuance>("issuance_date", "Issuance Date"),
  commonColumns.dateColumn<Issuance>("pullout_date", "Pullout Date"),
  commonColumns.employee<Issuance>(),
  commonColumns.department<Issuance>(),
  commonColumns.company<Issuance>(),
  commonColumns.simpleColumn<Issuance>("remarks", "Remarks"),
  commonColumns.actions<Issuance>(),
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
