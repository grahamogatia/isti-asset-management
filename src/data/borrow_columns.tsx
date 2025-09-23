import { type ColumnDef } from "@tanstack/react-table";
import type { Borrow } from "./types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import {
  getAsset,
  getCategoryName,
  getCompanyName,
  getConditionName,
  getDepartmentName,
  getEmployeeName,
  getSubCategoryName,
  getTypeName,
} from "@/lib/lookups";
import { differenceInDays, format } from "date-fns";

export const borrow_columns: ColumnDef<Borrow>[] = [
  {
    id: "asset_name",
    header: "Asset Name",
    cell: ({ row }) => {
      return getAsset(row.original.asset_id)?.asset_name;
    },
  },
  {
    id: "serial_number",
    header: "Serial Number",
    cell: ({ row }) => {
      return getAsset(row.original.asset_id)?.serial_number;
    },
  },
  {
    accessorKey: "category_id",
    header: "Category",
    cell: ({ row }) => {
      const assetID = getAsset(row.original.asset_id)?.category_id;
      if (!assetID) return;
      return getCategoryName(assetID);
    },
  },
  {
    accessorKey: "user_id",
    header: "Employee",
    cell: ({ row }) => {
      return getEmployeeName(row.original.user_id);
    },
  },
  {
    accessorKey: "department_id",
    header: "Department",
    cell: ({ row }) => {
      return getDepartmentName(row.original.department_id);
    },
  },
  {
    accessorKey: "date_borrowed",
    header: "Date Borrowed",
    cell: ({ row }) => {
      return format(new Date(row.original.date_borrowed), "PP");
    },
  },
  {
    accessorKey: "asset_condition_id",
    header: "Condition",
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return;
      return getConditionName(asset.asset_condition_id);
    },
  },
  {
    accessorKey: "borrow_transaction_id",
    header: "Borrow Transaction ID",
  },
  {
    accessorKey: "company_id",
    header: "Company",
    cell: ({ row }) => {
      return getCompanyName(row.original.company_id);
    },
  },
  {
    accessorKey: "sub_category_id",
    header: "Sub Category",
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return;
      return getSubCategoryName(asset.sub_category_id);
    },
  },
  {
    accessorKey: "type_id",
    header: "Type",
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset?.type_id) return;
      return getTypeName(asset.type_id);
    },
  },
  {
    accessorKey: "due_date",
    header: "Due Date",
    cell: ({ row }) => {
      return format(new Date(row.original.due_date), "PP");
    },
  },
  {
    accessorKey: "return_date",
    header: "Return Date",
    cell: ({ row }) => {
      console.log(row.original)
      if (row.original.return_date === "") return "---";
      return format(new Date(row.original.return_date), "PP");
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
          const result = differenceInDays(
            row.original.due_date,
            new Date()
          );
          return result <= 0 ? "Overdue" : result + " days";
        },
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    id: "actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Update Asset</DropdownMenuItem>
            <DropdownMenuItem className="text-red-700">
              Delete Asset
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const def_borrow_columns = [
  "asset_name",
  "serial_number",
  "category_id",
  "user_id",
  "department_id",
  "date_borrowed",
  "asset_condition_id",
  "actions",
];
