import { type ColumnDef } from "@tanstack/react-table";
import type { Borrow } from "./types";
import { differenceInDays } from "date-fns";
import { commonColumns } from "./common_columns";
import { Clock } from "lucide-react";

export const borrow_columns: ColumnDef<Borrow>[] = [
  // Asset identification first
  commonColumns.asset_name<Borrow>(),
  commonColumns.serial_number<Borrow>(),
  commonColumns.category<Borrow>(),
  commonColumns.sub_category<Borrow>(),
  commonColumns.type<Borrow>(),
  commonColumns.simpleColumn("borrow_transaction_id", "Borrow Transaction ID"),
  commonColumns.dateColumn<Borrow>("date_borrowed", "Date Borrowed"),
  commonColumns.dateColumn<Borrow>("due_date", "Due Date"),
  commonColumns.dateColumn<Borrow>("return_date", "Return Date"),
  {
    accessorKey: "duration",
    header: () => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Status
      </div>
    ),
    cell: ({ row }) => {
      const result = differenceInDays(row.original.due_date, new Date());
      return result <= 0 ? "Overdue" : result + " days remaining";
    },
  },
  commonColumns.employee<Borrow>(),
  commonColumns.department<Borrow>(),
  commonColumns.company<Borrow>(),
  commonColumns.condition<Borrow>(),
  commonColumns.simpleColumn("remarks", "Remarks"),
  commonColumns.actions<Borrow>(),
];

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
