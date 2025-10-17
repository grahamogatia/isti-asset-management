import { type ColumnDef } from "@tanstack/react-table";
import type { Repair } from "./types";
import { useCommonColumns } from "./common_columns";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { AlertTriangle } from "lucide-react";
import {
  createHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";
import ActionsButtonGroup from "@/components/ui/actions-button-group";
import IsRepairedForm from "@/components/pages/forms/sub-forms/IsRepairedForm";
import UpdateRepairForm from "@/components/pages/forms/update/UpdateRepairForm";
import IsRejectedForm from "@/components/pages/forms/sub-forms/IsRejectedForm";
import IsOnHoldForm from "@/components/pages/forms/sub-forms/IsOnHoldForm";

export function useRepairColumns() {
  const commonColumns = useCommonColumns<Repair>();
  const { getStatusName, getUrgencyName } = useLookupFunctions();

  const repair_columns: ColumnDef<Repair>[] = [
    // Asset identification first
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
      sortingFn: (rowA, rowB) => {
        const statusA = rowA.original.status_id as number;
        const statusB = rowB.original.status_id as number;
        return statusA - statusB;
      },
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
      sortingFn: (rowA, rowB) => {
        const urgencyA = rowA.original.urgency_id as number;
        const urgencyB = rowB.original.urgency_id as number;
        return urgencyA - urgencyB;
      },
    },
    commonColumns.asset_name(),
    commonColumns.serial_number(),
    commonColumns.category(),
    commonColumns.sub_category(),
    commonColumns.type(),
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
    commonColumns.dateColumn("date_reported", "Date Reported"),
    commonColumns.dateColumn("repair_start_date", "Start Date"),
    commonColumns.dateColumn("repair_completion_date", "Completion Date"),
    commonColumns.moneyColumn("repair_cost", "Repair Cost"),
    commonColumns.employee(),
    commonColumns.department(),
    commonColumns.company(),
    commonColumns.simpleColumn("remarks", "Remarks"),
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsButtonGroup
            type="Repair"
            updateForm={<UpdateRepairForm repair={row.original} />}
          >
            <IsRejectedForm repair={row.original} />
            <IsOnHoldForm repair={row.original} />
            <IsRepairedForm repair={row.original} />
          </ActionsButtonGroup>
        );
      },
    },
  ];

  return { repair_columns };
}

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

export const repair_filters = [
  "category",
  "company",
  "department",
  "status",
  "sub_category",
  "type",
  "urgency",
];
