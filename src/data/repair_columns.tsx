import { type ColumnDef } from "@tanstack/react-table";
import type { Repair } from "./types";
import { commonColumns } from "./common_columns";
import { getStatusName, getUrgencyName } from "@/lib/lookups";
import { AlertTriangle } from "lucide-react";
import { createHeaderWithIcon, createStandardFilterFn } from "@/lib/columnNameUtils";

export const repair_columns: ColumnDef<Repair>[] = [
  // Asset identification first
  commonColumns.asset_name<Repair>(),
  commonColumns.serial_number<Repair>(),
  commonColumns.category<Repair>(),
  commonColumns.sub_category<Repair>(),
  commonColumns.type<Repair>(),
  commonColumns.simpleColumn("repair_request_id", "Repair Request ID"),
  {
    accessorKey: "issue",
    header: () => (
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Issue
      </div>
    ),
  },
  {
    accessorKey: "urgency",
    accessorFn: (row) => {
      return getUrgencyName(row.urgency_id);
    },
    header: createHeaderWithIcon("urgency", "Urgency"),
    cell: ({ row }) => {
      return getUrgencyName(row.original.urgency_id);
    },
    filterFn: createStandardFilterFn((row) => 
      getUrgencyName(row.original.urgency_id)
    ),
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      return getStatusName(row.status_id);
    },
    header: createHeaderWithIcon("status", "Status"),
    cell: ({ row }) => {
      return getStatusName(row.original.status_id);
    },
    filterFn: createStandardFilterFn((row) => 
      getStatusName(row.original.status_id)
    ),
  },
  commonColumns.dateColumn<Repair>("date_reported", "Date Reported"),
  commonColumns.dateColumn<Repair>("repair_start_date", "Start Date"),
  commonColumns.dateColumn<Repair>("repair_completion_date", "Completion Date"),
  commonColumns.moneyColumn<Repair>("repair_cost", "Repair Cost"),
  commonColumns.employee<Repair>(),
  commonColumns.department<Repair>(),
  commonColumns.company<Repair>(),
  commonColumns.simpleColumn<Repair>("remarks", "Remarks"),
  commonColumns.actions<Repair>(),
];

// export const def_repair_columns = [
//   "asset_name",
//   "serial_number",
//   "issue",
//   "urgency",
//   "status",
//   "date_reported",
//   "repair_cost",
//   "employee",
//   "actions",
// ];

export const def_repair_columns = [
  "asset_name",
  "category",
  "company",
  "department",
  "status",
  "sub_category",
  "type",
  "urgency"
];

export const repair_filters = [
  "category",
  "company",
  "department",
  "status",
  "sub_category",
  "type",
  "urgency",
];
