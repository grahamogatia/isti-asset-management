import { type ColumnDef } from "@tanstack/react-table";
import type { Borrow } from "./types";
import { differenceInDays } from "date-fns";
import { useCommonColumns } from "./common_columns";
import { Clock, SquarePen } from "lucide-react";
import IsReturnedForm from "@/components/pages/forms/sub-forms/IsReturnedForm";
import FormSheet from "@/components/layout/FormSheet";
import { Button } from "@/components/ui/button";
import UpdateBorrowForm from "@/components/pages/forms/update/UpdateBorrowForm";
import { ButtonGroup } from "@/components/ui/button-group";
import DeleteBorrowForm from "@/components/pages/forms/delete/DeleteBorrowForm";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";

export function useBorrowColumns() {
  const commonColumns = useCommonColumns<Borrow>();

  const borrow_columns: ColumnDef<Borrow>[] = [
    // Asset identification first
    commonColumns.asset_name(),
    commonColumns.serial_number(),
    commonColumns.category(),
    commonColumns.sub_category(),
    commonColumns.type(),
    commonColumns.simpleColumn(
      "borrow_transaction_id",
      "Borrow Transaction ID"
    ),
    commonColumns.dateColumn("date_borrowed", "Date Borrowed"),
    commonColumns.dateColumn("due_date", "Due Date"),
    commonColumns.dateColumn("return_date", "Return Date"),
    {
      accessorKey: "duration",
      header: () => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Status
        </div>
      ),
      cell: ({ row }) => {
        const result = differenceInDays(
          row.original.due_date as Date,
          new Date()
        );
        return result <= 0 ? "Overdue" : result + " days remaining";
      },
    },
    commonColumns.employee(),
    commonColumns.department(),
    commonColumns.company(),
    commonColumns.condition(),
    commonColumns.simpleColumn("remarks", "Remarks"),
    {
      id: "actions",
      cell: ({ row }) => {
        const { getAsset, getStatusIdGivenStatusName } = useLookupFunctions();
        const asset = getAsset(row.original.asset_id);
        const isReturned = row.original.return_date != null;
        const isDeleted = asset?.status_id === getStatusIdGivenStatusName("Asset Inventory", "Deleted")


        return (
          <ButtonGroup className="hidden sm:flex">
            {!isReturned && !isDeleted && (
              <>
                <IsReturnedForm borrow={row.original} />

                <FormSheet
                  type={"Borrow"}
                  taskName="Update"
                  button={
                    <Button variant="outline">
                      <SquarePen className="h-4 w-4" />
                    </Button>
                  }
                  form={<UpdateBorrowForm borrow={row.original} />}
                />
              </>
            )}
            <DeleteBorrowForm borrow={row.original}/>
          </ButtonGroup>
        );
      },
    },
  ];

  return { borrow_columns };
}

export const def_borrow_columns = [
  "asset_name",
  "serial_number",
  "date_borrowed",
  "return_date",
  "employee",
  "department",
  "actions",
];

export const borrow_filters = [
  "category",
  "company",
  "department",
  "status",
  "sub_category",
  "type",
];
