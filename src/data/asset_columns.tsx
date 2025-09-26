import { type ColumnDef } from "@tanstack/react-table";
import { differenceInMonths, format } from "date-fns";
import type { Asset } from "./types";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal
} from "lucide-react";
import {
  getCategoryName,
  getSubCategoryName,
  getTypeName,
  getConditionName,
  getStatusName,
  getInsuranceName,
} from "@/lib/lookups";
import { createHeaderWithIcon, createSortableHeaderWithIcon, createStandardFilterFn } from "@/lib/columnNameUtils";

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
    header: createHeaderWithIcon("asset_id", "Asset ID")
  },
  {
    accessorKey: "asset_name",
    header: createSortableHeaderWithIcon("asset_name", "Asset Name"),
  },
  {
    accessorKey: "category",
    header: createHeaderWithIcon("catgory", "Category"),
    cell: ({ row }) => {
      const categoryId = row.original.category_id;
      return getCategoryName(categoryId);
    },
  },
  {
    accessorKey: "sub_category",
    header: createHeaderWithIcon("sub_category", "Sub Category"),
    cell: ({ row }) => {
      const subCategoryId = row.original.sub_category_id;
      return getSubCategoryName(subCategoryId);
    },
  },
  {
    accessorKey: "type",
    header: createHeaderWithIcon("type", "Type"),
    cell: ({ row }) => {
      const typeId = row.original.type_id;
      return typeId ? getTypeName(typeId) : "-";
    },
  },
  {
    accessorKey: "serial_number",
    header: createHeaderWithIcon("serial_number", "Serial Number"),
  },
  {
    accessorKey: "file",
    header: createHeaderWithIcon("file", "File"),
  },
  {
    accessorKey: "brand",
    header: createHeaderWithIcon("brand", "Brand"),
  },
  {
    accessorKey: "condition",
    accessorFn: (row) => {
      return getConditionName(row.asset_condition_id);
    },
    header: createHeaderWithIcon("condition", "Condition"),
    cell: ({ row }) => {
      const conditionId = row.original.asset_condition_id;
      return getConditionName(conditionId);
    },
    filterFn: createStandardFilterFn((row) => 
      getConditionName(row.original.asset_condition_id)
    ),
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      return getStatusName(row.status_id);
    },
    header: createHeaderWithIcon("status", "Status"),
    cell: ({ row }) => {
      const statusId = row.original.status_id;
      return getStatusName(statusId);
    },
    filterFn: createStandardFilterFn((row) => 
      getStatusName(row.original.status_id)
    ),
  },
  {
    accessorKey: "specifications",
    header: createHeaderWithIcon("specifications", "Specifications"),
  },
  {
    accessorKey: "asset_amount",
    header: createHeaderWithIcon("asset_amount", "Amount"),
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
    header: createHeaderWithIcon("warranty_duration", "Warranty Remaining"),
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
    header: createHeaderWithIcon("warranty_due_date", "Warranty Due Date"),
    cell: ({ row }) => {
      return format(new Date(row.original.warranty_due_date), "PP");
    },
  },
  {
    accessorKey: "purchase_date",
    header: createHeaderWithIcon("purchase_date", "Purchase Date"),
    cell: ({ row }) => {
      return format(new Date(row.original.purchase_date), "PP");
    },
  },
  {
    id: "aging",
    header: createHeaderWithIcon("aging", "Age"),
    cell: ({ row }) => {
      const purchaseDate = row.original.purchase_date;
      if (!purchaseDate) return "-";
      const purchase = new Date(purchaseDate);
      return differenceInMonths(new Date(), purchase) + " months";
    },
  },
  {
    id: "asset_value",
    header: createHeaderWithIcon("asset_value", "Asset Value"),
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
    header: createHeaderWithIcon("notes", "Notes"),
  },
  {
    accessorKey: "insurance",
    accessorFn: (row) => { 
      if (!row.insurance_id) return;
      return getInsuranceName(row.insurance_id)
    },
    header: createHeaderWithIcon("insurance", "Insurance"),
    cell: ({ row }) => {
      if (!row.original.insurance_id) return;
      return getInsuranceName(row.original.insurance_id);
    },
    filterFn: createStandardFilterFn((row) => 
      row.original.insurance_id ? getInsuranceName(row.original.insurance_id) : null
    ),
  },
  {
    accessorKey: "location",
    header: createHeaderWithIcon("location", "Location"),
    filterFn: createStandardFilterFn((row) => 
      row.original.location
    )
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
  "serial_number",
  "file",
  "brand",
  "condition",
  "status",
  "actions",
];

export const asset_filters = [
  "condition",
  "status",
  "asset_amount",
  "purchase_date",
  "insurance",
  "location"
]