import { type ColumnDef } from "@tanstack/react-table";
import type { Repair } from "./types";
import { useCommonColumns } from "./common_columns";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { AlertTriangle, CircleX, SquarePen } from "lucide-react";
import {
  createHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";
import IsRepairedForm from "@/components/pages/forms/sub-forms/IsRepairedForm";
import UpdateRepairForm from "@/components/pages/forms/update/UpdateRepairForm";
import IsRejectedForm from "@/components/pages/forms/sub-forms/IsRejectedForm";
import IsOnHoldForm from "@/components/pages/forms/sub-forms/IsOnHoldForm";
import IsRepairContinuedForm from "@/components/pages/forms/sub-forms/IsRepairContinuedForm";
import FormSheet from "@/components/layout/FormSheet";
import { Button } from "@/components/ui/button";
import DeleteRepairForm from "@/components/pages/forms/delete/DeleteRepairForm";
import { ButtonGroup } from "@/components/ui/button-group";
import { statusConfig, urgencyConfig } from "@/lib/statusStyles";
import { Badge } from "@/components/ui/badge";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";

export function useRepairColumns() {
  const commonColumns = useCommonColumns<Repair>();
  const { getStatusName, getUrgencyName } = useLookupFunctions();

  const repair_columns: ColumnDef<Repair>[] = [
    {
      accessorKey: "status",
      accessorFn: (row) => {
        return getStatusName(row.status_id as number);
      },
      header: createHeaderWithIcon("status", "Status"),
      cell: ({ row }) => {
        const statusName = getStatusName(row.original.status_id as number);
        const key = statusName as keyof typeof statusConfig;
        const config = statusConfig[key] ?? {
          icon: CircleX,
          color: "bg-gray-100 text-gray-600",
        };
        const Icon = config.icon;

        return (
          <Badge
            className={`flex items-center gap-1 px-2 py-1 ${config.color}`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{statusName}</span>
          </Badge>
        );
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
        const urgencyName = getUrgencyName(row.original.urgency_id as number);
        const key = urgencyName as keyof typeof urgencyConfig;
        const config = urgencyConfig[key] ?? {
          icon: CircleX,
          color: "bg-gray-100 text-gray-600",
        };
        const Icon = config.icon;

        return (
          <Badge
            className={`flex items-center gap-1 px-2 py-1 ${config.color}`}
            variant="outline"
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{urgencyName}</span>
          </Badge>
        );
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
        const { getAsset, getStatusIdGivenStatusName } = useLookupFunctions();
        const asset = getAsset(row.original.asset_id);
        const isDeleted =
          asset?.status_id ===
          getStatusIdGivenStatusName("Asset Inventory", "Deleted");

        const statusName = getStatusName(row.original.status_id as number);
        const isUnderRepair = statusName === "Under Repair";
        const isOnHold = statusName === "On Hold";
        const isCompleted = statusName === "Completed";

        return (
          <ButtonGroup className="hidden sm:flex">
            {isUnderRepair && !isDeleted && (
              <>
                <IsRejectedForm repair={row.original} />
                <IsOnHoldForm repair={row.original} />
                <IsRepairedForm repair={row.original} />
              </>
            )}

            {/* Update */}
            {(isUnderRepair || isCompleted) && !isDeleted && (
              <FormSheet
                type={"Repair"}
                taskName="Update"
                button={
                  <FormSheetTrigger icon={SquarePen} name="Update Repair" />
                }
                form={<UpdateRepairForm repair={row.original} />}
              />
            )}

            {isOnHold && <IsRepairContinuedForm repair={row.original} />}
            <DeleteRepairForm repair={row.original} />
          </ButtonGroup>
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
