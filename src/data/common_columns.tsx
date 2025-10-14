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
import { MoreHorizontal, Hash } from "lucide-react";
import {
  getAsset,
  getCompanyName,
  getConditionName,
  getDepartmentName,
  getEmployeeName,
} from "@/lib/lookups";
import { format } from "date-fns";
import {
  createHeaderWithIcon,
  createSortableHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";

// Generic type that covers common fields across Borrow, Repair, and Issuance
type CommonFields = {
  asset_id: number;
  user_id: number;
  company_id: number;
};

export const commonColumns = {
  asset_name: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "asset_name",
    accessorFn: (row) => {
      return getAsset(row.asset_id)?.asset_name;
    },
    header: createSortableHeaderWithIcon("asset_name", "Asset Name"),
    cell: ({ row }) => {
      return getAsset(row.original.asset_id)?.asset_name;
    },
  }),

  serial_number: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "serial_number",
    accessorFn: (row) => {
      return getAsset(row.asset_id)?.serial_number;
    },
    header: createHeaderWithIcon("serial_number", "Serial Number"),
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
    header: createHeaderWithIcon("category", "Category"),
    cell: ({ row }) => {
      const assetID = getAsset(row.original.asset_id)?.category_id;
      if (!assetID) return;
      return getCategoryName(assetID);
    },
    filterFn: createStandardFilterFn((row) => {
      const assetID = getAsset(row.original.asset_id)?.category_id;
      if (!assetID) return null;
      return getCategoryName(assetID);
    }),
  }),

  employee: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "employee",
    accessorFn: (row) => {
      return getEmployeeName(row.user_id);
    },
    header: createHeaderWithIcon("employee", "Employee"),
    cell: ({ row }) => {
      return getEmployeeName(row.original.user_id);
    },
    filterFn: createStandardFilterFn((row) =>
      getEmployeeName(row.original.user_id)
    ),
  }),

  department: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "department",
    accessorFn: (row) => {
      return getDepartmentName(row.department_id);
    },
    header: createHeaderWithIcon("department", "Department"),
    cell: ({ row }) => {
      return getDepartmentName(row.original.department_id);
    },
    filterFn: createStandardFilterFn((row) =>
      getDepartmentName(row.original.department_id)
    ),
  }),

  company: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "company",
    accessorFn: (row) => {
      return getCompanyName(row.company_id);
    },
    header: createHeaderWithIcon("company", "Company"),
    cell: ({ row }) => {
      return getCompanyName(row.original.company_id);
    },
    filterFn: createStandardFilterFn((row) =>
      getCompanyName(row.original.company_id)
    ),
  }),

  condition: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "condition",
    accessorFn: (row) => {
      const asset = getAsset(row.asset_id);
      if (!asset) return;
      return getConditionName(asset.asset_condition_id as number);
    },
    header: createHeaderWithIcon("condition", "Condition"),
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return;
      return getConditionName(asset.asset_condition_id as number);
    },
    filterFn: createStandardFilterFn((row) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return null;
      return getConditionName(asset.asset_condition_id as number);
    }),
  }),

  sub_category: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "sub_category",
    accessorFn: (row) => {
      const asset = getAsset(row.asset_id);
      if (!asset) return;
      return getSubCategoryName(asset.sub_category_id);
    },
    header: createHeaderWithIcon("sub_category", "Sub Category"),
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return;
      return getSubCategoryName(asset.sub_category_id);
    },
    filterFn: createStandardFilterFn((row) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset) return null;
      return getSubCategoryName(asset.sub_category_id);
    }),
  }),

  type: <T extends CommonFields>(): ColumnDef<T> => ({
    id: "type",
    accessorFn: (row) => {
      const asset = getAsset(row.asset_id);
      if (!asset?.type_id) return;
      return getTypeName(asset.type_id);
    },
    header: createHeaderWithIcon("type", "Type"),
    cell: ({ row }) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset?.type_id) return;
      return getTypeName(asset.type_id);
    },
    filterFn: createStandardFilterFn((row) => {
      const asset = getAsset(row.original.asset_id);
      if (!asset?.type_id) return null;
      return getTypeName(asset.type_id);
    }),
  }),

  // Date formatter utility
  dateColumn: <T extends Record<string, any>>(
    accessorKey: keyof T,
    header: string
  ): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header: createHeaderWithIcon(accessorKey as string, header),
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
    header: createHeaderWithIcon(accessorKey as string, header),
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
    header: "",
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
  }),

  // Simple column helper - just accessorKey and header
  simpleColumn: <T extends Record<string, any>>(
    accessorKey: keyof T,
    header: string
  ): ColumnDef<T> => ({
    accessorKey: accessorKey as string,
    header: () => (
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4" />
        {header}
      </div>
    ),
  }),
};
