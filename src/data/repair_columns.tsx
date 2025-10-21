import { type ColumnDef } from "@tanstack/react-table";
import type { Repair } from "./types";
import { useCommonColumns } from "./common_columns";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { AlertTriangle, SquarePen } from "lucide-react";
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
        const statusName = getStatusName(row.original.status_id as number);
        const isUnderRepair = statusName === "Under Repair";
        const isOnHold = statusName === "On Hold";
        const isCompleted = statusName === "Completed";

        return (
          <ButtonGroup className="hidden sm:flex">
            {isUnderRepair && (
              <>
                <IsRejectedForm repair={row.original} />
                <IsOnHoldForm repair={row.original} />
                <IsRepairedForm repair={row.original} />
              </>
            )}

            {/* Update */}
            {(isUnderRepair || isCompleted) && (
              <FormSheet
                type={"Repair"}
                taskName="Update"
                button={
                  <Button variant="outline">
                    <SquarePen className="h-4 w-4" />
                  </Button>
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
