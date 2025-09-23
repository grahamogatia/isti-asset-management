import { type ColumnDef } from "@tanstack/react-table";
import type { Borrow } from "./types";

export const borrow_columns: ColumnDef<Borrow>[] = [
  {
    accessorKey: "asset_id",
    header: "Asset ID",
  },
  {
    accessorKey: "category_id",
    header: "Category",
  },
  {
    accessorKey: "user_id",
    header: "User",
  },
  {
    accessorKey: "department_id",
    header: "Department",
  },
  {
    accessorKey: "date_borrowed",
    header: "Date Borrowed",
  },
  {
    accessorKey: "asset_condition_id",
    header: "Asset Condition",
  },
  {
    accessorKey: "borrow_transaction_id",
    header: "Transaction ID",
  },
  {
    accessorKey: "company_id",
    header: "Company",
  },
  {
    accessorKey: "sub_category_id",
    header: "Sub Category",
  },
  {
    accessorKey: "type_id",
    header: "Type",
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
  },
  {
    accessorKey: "duration",
    header: "Duration",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
];

export const def_borrow_columns = [
  "asset_id",
  "category_id",
  "user_id",
  "department_id",
  "date_borrowed",
  "asset_condition_id",
];
