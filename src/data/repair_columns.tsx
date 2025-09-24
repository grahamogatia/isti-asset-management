import { type ColumnDef } from "@tanstack/react-table";
import type { Repair } from "./types";
import { commonColumns } from "./common_columns";
import { getStatusName } from "@/lib/lookups";

export const repair_columns: ColumnDef<Repair>[] = [
  commonColumns.asset_name<Repair>(),
  commonColumns.serial_number<Repair>(),
  commonColumns.category<Repair>(),
  commonColumns.employee<Repair>(),
  commonColumns.company<Repair>(),
  commonColumns.department<Repair>(),
  commonColumns.dateColumn<Repair>("date_reported", "Date Reported"),
  commonColumns.simpleColumn<Repair>("issue", "Issue"),
  commonColumns.dateColumn<Repair>("repair_completion_date", "Repair Completion Date"),
  commonColumns.moneyColumn<Repair>("repair_cost", "Repair Cost"),
  commonColumns.simpleColumn<Repair>("repair_request_id", "Repair ID"),
  commonColumns.dateColumn<Repair>("repair_start_date", "Repair Start Date"),

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
  {
    accessorKey: "urgency",
    accessorFn: (row) => {
      return getStatusName(row.urgency_id);
    },
    header: "Urgency",
    cell: ({ row }) => {
      return getStatusName(row.original.urgency_id);
    }
  },

  commonColumns.sub_category<Repair>(),
  commonColumns.type<Repair>(),
  commonColumns.simpleColumn<Repair>("remarks", "Remarks"),
  commonColumns.actions<Repair>(),
];

export const def_repair_columns = [
  "asset_name",
  "serial_number",
  "issue",
  "category",
  "employee",
  "department",
  "urgency",
  "status",
  "actions",
];
