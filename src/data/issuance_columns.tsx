import { type ColumnDef } from "@tanstack/react-table";
import type { Issuance } from "./types";
import { commonColumns } from "./common_columns";
import { getStatusName } from "@/lib/lookups";
import { Hash, AlertTriangle } from "lucide-react";

export const issuance_columns: ColumnDef<Issuance>[] = [
  // Asset identification first
  commonColumns.asset_name<Issuance>(),
  commonColumns.category<Issuance>(),
  commonColumns.sub_category<Issuance>(),
  commonColumns.type<Issuance>(),
  
  // Issuance details
  {
    accessorKey: "issuance_id",
    header: () => (
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4" />
        Issuance ID
      </div>
    ),
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      return getStatusName(row.status_id);
    },
    header: () => (
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Status
      </div>
    ),
    cell: ({ row }) => {
      return getStatusName(row.original.status_id);
    }
  },
  
  // Timeline
  commonColumns.dateColumn<Issuance>("issuance_date", "Issuance Date"),
  commonColumns.dateColumn<Issuance>("pullout_date", "Pullout Date"),
  
  // People & organization
  commonColumns.employee<Issuance>(),
  commonColumns.department<Issuance>(),
  commonColumns.company<Issuance>(),
  
  // Additional info
  commonColumns.simpleColumn<Issuance>("remarks", "Remarks"),
  
  // Actions last
  commonColumns.actions<Issuance>(),
];

export const def_issuance_columns = [
  "asset_name",
  "serial_number",
  "status",
  "issuance_date",
  "expected_return",
  "employee",
  "department",
  "actions",
];
