// TODO Add Insurance
import { /* useMemo removed */ } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { differenceInMonths, format } from "date-fns";
import type { Asset } from "./types";
// removed direct lookups imports
import {
  createHeaderWithIcon,
  createSortableHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";

import ActionsButtonGroup from "@/components/ui/actions-button-group";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";

export function useAssetColumns(): ColumnDef<Asset>[] {
  const {
    getCategoryName,
    getSubCategoryName,
    getTypeName,
    getConditionName,
    getStatusName,
  } = useLookupFunctions();

  return [
    {
      accessorKey: "asset_id",
      header: createHeaderWithIcon("asset_id", "Asset ID"),
    },
    {
      accessorKey: "asset_name",
      header: createSortableHeaderWithIcon("asset_name", "Asset Name"),
    },
    {
      accessorKey: "category",
      header: createHeaderWithIcon("category", "Category"),
      cell: ({ row }) => {
        return <span>{getCategoryName(row.original.category_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) =>
        getCategoryName(row.original.category_id)
      ),
    },
    {
      accessorKey: "sub_category",
      header: createHeaderWithIcon("sub_category", "Sub Category"),
      cell: ({ row }) => {
        return <span>{getSubCategoryName(row.original.sub_category_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) =>
        getSubCategoryName(row.original.sub_category_id)
      ),
    },
    {
      accessorKey: "type",
      header: createHeaderWithIcon("type", "Type"),
      cell: ({ row }) => {
        return row.original.type_id ? (
          <span>{getTypeName(row.original.type_id)}</span>
        ) : (
          <span>-</span>
        );
      },
      filterFn: createStandardFilterFn((row) =>
        row.original.type_id ? getTypeName(row.original.type_id) : null
      ),
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
      accessorFn: (row) =>
        row.asset_condition_id ? getConditionName(row.asset_condition_id) : null,
      header: createHeaderWithIcon("condition", "Condition"),
      cell: ({ row }) => {
        return <span>{getConditionName(row.original.asset_condition_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) =>
        row.original.asset_condition_id ? getConditionName(row.original.asset_condition_id) : null
      ),
    },
    {
      accessorKey: "status",
      accessorFn: (row) => (row.status_id ? getStatusName(row.status_id) : null),
      header: createHeaderWithIcon("status", "Status"),
      cell: ({ row }) => {
        return <span>{getStatusName(row.original.status_id as number)}</span>;
      },
      filterFn: createStandardFilterFn((row) =>
        row.original.status_id ? getStatusName(row.original.status_id) : null
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
        const value = row.original.asset_amount ?? 0;
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
        const due = row.original.warranty_due_date;
        if (!due) return "No warranty date";
        const result = differenceInMonths(new Date(due), new Date());
        return result <= 0 ? "Warranty Void" : result + " months";
      },
    },
    {
      accessorKey: "warranty_due_date",
      header: createHeaderWithIcon("warranty_due_date", "Warranty Due Date"),
      cell: ({ row }) => {
        if (!row.original.warranty_due_date) return "-";
        return format(new Date(row.original.warranty_due_date), "PP");
      },
    },
    {
      accessorKey: "purchase_date",
      header: createHeaderWithIcon("purchase_date", "Purchase Date"),
      cell: ({ row }) => {
        if (!row.original.purchase_date) return "-";
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
      filterFn: createStandardFilterFn((row) =>
        row.original.purchase_date ? String(row.original.purchase_date) : null
      ),
    },
    {
      id: "asset_value",
      header: createHeaderWithIcon("asset_value", "Asset Value"),
      cell: ({ row }) => {
        const LAPTOP_SAMPLE_DEPRECIATION = 60; // months
        const purchaseDate = row.original.purchase_date;
        const amt = row.original.asset_amount ?? 0;

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
      accessorKey: "location",
      header: createHeaderWithIcon("location", "Location"),
      filterFn: createStandardFilterFn((row) => row.original.location),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <ActionsButtonGroup
            type="Asset"
      
          />
        );
      },
    },
  ];
}
// ...existing code...
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
  "location",
];