import { type ColumnDef } from "@tanstack/react-table";
import type { Repair } from "./types";
import { commonColumns } from "./common_columns";
import { getStatusName } from "@/lib/lookups";
import { AlertTriangle, Wrench, Hash } from "lucide-react";

export const repair_columns: ColumnDef<Repair>[] = [
  // Asset identification first
  commonColumns.asset_name<Repair>(),
  commonColumns.serial_number<Repair>(),
  commonColumns.category<Repair>(),
  commonColumns.sub_category<Repair>(),
  commonColumns.type<Repair>(),
  
  // Repair details
  {
    accessorKey: "repair_request_id", 
    header: () => (
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4" />
        Repair ID
      </div>
    ),
  },
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
      return getStatusName(row.urgency_id);
    },
    header: () => (
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Urgency
      </div>
    ),
    cell: ({ row }) => {
      return getStatusName(row.original.urgency_id);
    }
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      return getStatusName(row.status_id);
    },
    header: () => (
      <div className="flex items-center gap-2">
        <Wrench className="h-4 w-4" />
        Status
      </div>
    ),
    cell: ({ row }) => {
      return getStatusName(row.original.status_id);
    }
  },
  
  // Timeline
  commonColumns.dateColumn<Repair>("date_reported", "Date Reported"),
  commonColumns.dateColumn<Repair>("repair_start_date", "Start Date"),
  commonColumns.dateColumn<Repair>("repair_completion_date", "Completion Date"),
  
  // Cost
  commonColumns.moneyColumn<Repair>("repair_cost", "Repair Cost"),
  
  // People & organization
  commonColumns.employee<Repair>(),
  commonColumns.department<Repair>(),
  commonColumns.company<Repair>(),
  
  // Additional info
  commonColumns.simpleColumn<Repair>("remarks", "Remarks"),
  
  // Actions last
  commonColumns.actions<Repair>(),
];

export const def_repair_columns = [
  "asset_name",
  "serial_number",
  "issue",
  "urgency",
  "status",
  "date_reported",
  "repair_cost",
  "employee",
  "actions",
];
