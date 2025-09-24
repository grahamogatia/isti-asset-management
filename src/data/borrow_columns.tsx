import { type ColumnDef } from "@tanstack/react-table";
import type { Borrow } from "./types";
import { differenceInDays } from "date-fns";
import { commonColumns } from "./common_columns";

export const borrow_columns: ColumnDef<Borrow>[] = [
  commonColumns.asset_name<Borrow>(),
  commonColumns.serial_number<Borrow>(),
  commonColumns.category<Borrow>(),
  commonColumns.employee<Borrow>(),
  commonColumns.company<Borrow>(),
  commonColumns.department<Borrow>(),
  commonColumns.dateColumn<Borrow>("date_borrowed", "Date Borrowed"),
  commonColumns.condition<Borrow>(),
  {
    accessorKey: "borrow_transaction_id",
    header: "Borrow Transaction ID",
  },
  commonColumns.sub_category<Borrow>(),
  commonColumns.type<Borrow>(),
  commonColumns.dateColumn<Borrow>("due_date", "Due Date"),
  commonColumns.dateColumn<Borrow>("return_date", "Return Date"),
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const result = differenceInDays(row.original.due_date, new Date());
      return result <= 0 ? "Overdue" : result + " days";
    },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  commonColumns.actions<Borrow>(),
];

export const def_borrow_columns = [
  "asset_name",
  "serial_number",
  "category",
  "department",
  "employee",
  "date_borrowed",
  "condition",
  "actions",
];
