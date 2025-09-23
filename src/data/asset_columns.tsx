import { type ColumnDef } from "@tanstack/react-table";
import { differenceInMonths, format } from "date-fns";
import type { Asset } from "./types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  getCategoryName,
  getSubCategoryName,
  getTypeName,
  getConditionName,
  getStatusName,
  getInsuranceName,
} from "@/lib/lookups";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const asset_columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "asset_id",
    header: "Asset ID",
  },
  {
    accessorKey: "asset_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category_id",
    header: "Category",
    cell: ({ row }) => {
      const categoryId = row.original.category_id;
      return getCategoryName(categoryId);
    },
  },
  {
    accessorKey: "sub_category_id",
    header: "Sub Category",
    cell: ({ row }) => {
      const subCategoryId = row.original.sub_category_id;
      return getSubCategoryName(subCategoryId);
    },
  },
  {
    accessorKey: "type_id",
    header: "Type",
    cell: ({ row }) => {
      const typeId = row.original.type_id;
      return typeId ? getTypeName(typeId) : "-";
    },
  },
  {
    accessorKey: "file",
    header: "File",
  },
  {
    accessorKey: "serial_number",
    header: "Serial Number",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "asset_condition_id",
    accessorFn: (row) => {
      return getConditionName(row.asset_condition_id);
    },
    header: "Condition",
    cell: ({ row }) => {
      const conditionId = row.original.asset_condition_id;
      return getConditionName(conditionId);
    },
  },
  {
    accessorKey: "status_id",
    accessorFn: (row) => {
      return getStatusName(row.status_id);
    },
    header: "Status",
    cell: ({ row }) => {
      const statusId = row.original.status_id;
      return getStatusName(statusId);
    },
  },
  {
    accessorKey: "specifications",
    header: "Specifications",
  },
  {
    accessorKey: "asset_amount",
    header: "Amount",
    cell: ({ row }) => {
      const value = row.original.asset_amount;
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(value);
    },
  },
  {
    accessorKey: "warranty_duration",
    header: "Warranty Remaining",
    cell: ({ row }) => {
      const result = differenceInMonths(
        row.original.warranty_due_date,
        new Date()
      );
      return result <= 0 ? "Warranty Void" : result + " months";
    },
  },
  {
    accessorKey: "warranty_due_date",
    header: "Warranty Due Date",
    cell: ({ row }) => {
      return format(new Date(row.original.warranty_due_date), "PP");
    },
  },
  {
    accessorKey: "purchase_date",
    header: "Purchase Date",
    cell: ({ row }) => {
      return format(new Date(row.original.purchase_date), "PP");
    },
  },
  {
    id: "aging",
    header: "Age",
    cell: ({ row }) => {
      const purchaseDate = row.original.purchase_date;
      if (!purchaseDate) return "-";
      const purchase = new Date(purchaseDate);
      return differenceInMonths(new Date(), purchase) + " months";
    },
  },
  {
    id: "asset_value",
    header: "Asset Value",
    cell: ({ row }) => {
      const LAPTOP_SAMPLE_DEPRECIATION = 60; //60 months === depriciated
      const purchaseDate = row.original.purchase_date;
      const amt = row.original.asset_amount;

      if (!purchaseDate) return "-";
      const purchase = new Date(purchaseDate);
      const age = differenceInMonths(new Date(), purchase);

      const value =
        age > LAPTOP_SAMPLE_DEPRECIATION
          ? 0
          : amt - (amt / LAPTOP_SAMPLE_DEPRECIATION) * age;
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(value);
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "insurance_id",
    accessorFn: (row) => { 
      if (!row.insurance_id) return;
      return getInsuranceName(row.insurance_id)
    },
    header: "Insurance",
    cell: ({ row }) => {
      if (!row.original.insurance_id) return;
      return getInsuranceName(row.original.insurance_id);
    },
  },
  {
    accessorKey: "location",
    header: "Location",
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

export const def_asset_columns = [
  "asset_name",
  "file",
  "serial_number",
  "brand",
  "asset_condition_id",
  "status_id",
  "actions",
];
