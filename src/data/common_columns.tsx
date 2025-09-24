import { type ColumnDef } from "@tanstack/react-table";
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
import { format } from "date-fns";

// Generic type that covers common fields across Borrow, Repair, and Issuance
type CommonFields = {
  asset_id: number;
  user_id: number;
  department_id: number;
  company_id: number;
};

// Reusable column definitions
export const commonColumns = {
  asset_name: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "asset_name",
    accessorFn: (row) => {
      return getAsset(row.asset_id)?.asset_name;
    },
    header: "Asset Name",
    cell: ({ row }) => {
      return getAsset(row.original.asset_id)?.asset_name;
    },
  }),

  serial_number: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "serial_number",
    accessorFn: (row) => {
      return getAsset(row.asset_id)?.serial_number;
    },
    header: "Serial Number",
    cell: ({ row }) => {
      return getAsset(row.original.asset_id)?.serial_number;
    },
  }),

  category: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "category",
    accessorFn: (row) => {
      const assetID = getAsset(row.asset_id)?.category_id;
      if (!assetID) return;
      return getCategoryName(assetID);
    },
    header: "Category",
    cell: ({ row }) => {
      const assetID = getAsset(row.original.asset_id)?.category_id;
      if (!assetID) return;
      return getCategoryName(assetID);
    },
  }),

  employee: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "employee",
    accessorFn: (row) => {
      return getEmployeeName(row.user_id);
    },
    header: "Employee",
    cell: ({ row }) => {
      return getEmployeeName(row.original.user_id);
    },
  }),

  department: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "department",
    accessorFn: (row) => {
      return getDepartmentName(row.department_id);
    },
    header: "Department",
    cell: ({ row }) => {
      return getDepartmentName(row.original.department_id);
    },
  }),

  company: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "company",
    accessorFn: (row) => {
      return getCompanyName(row.company_id);
    },
    header: "Company",
    cell: ({ row }) => {
      return getCompanyName(row.original.company_id);
    },
  }),

  condition: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "condition",
    accessorFn: (row) => {
      const asset = getAsset(row.asset_id);
      if (!asset) return;
      return getConditionName(asset.asset_condition_id);
    },
    header: "Condition",
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return;
      return getConditionName(asset.asset_condition_id);
    },
  }),

  sub_category: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "sub_category",
    accessorFn: (row) => {
      const asset = getAsset(row.asset_id);
      if (!asset) return;
      return getSubCategoryName(asset.sub_category_id);
    },
    header: "Sub Category",
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return;
      return getSubCategoryName(asset.sub_category_id);
    },
  }),

  type: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "type",
    accessorFn: (row) => {
      const asset = getAsset(row.asset_id);
      if (!asset?.type_id) return;
      return getTypeName(asset.type_id);
    },
    header: "Type",
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset?.type_id) return;
      return getTypeName(asset.type_id);
    },
  }),

  // Date formatter utility
  dateColumn: <T extends Record<string, any>>(
    accessorKey: keyof T,
    header: string
  ): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header,
    cell: ({ row }) => {
      const date = row.original[accessorKey];
      if (!date || date === "") return "---";
      return format(new Date(date as string), "PP");
    },
  }),

  moneyColumn: <T extends Record<string, any>>(
    accessorKey: keyof T,
    header: string
  ): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header,
    cell: ({ row }) => {
      const value = row.original[accessorKey];
      return new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(value);
    },
  }),

  // Actions column
  actions: <T extends Record<string, any>>(): ColumnDef<T> => ({
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
            <DropdownMenuItem>Update</DropdownMenuItem>
            <DropdownMenuItem className="text-red-700">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),

  // Simple column helper - just accessorKey and header
  simpleColumn: <T extends Record<string, any>>(
    accessorKey: keyof T,
    header: string
  ): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header,
  }),
};
