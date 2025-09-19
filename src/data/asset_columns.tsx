import { type ColumnDef } from "@tanstack/react-table"

import type { Asset } from "./types";

export const asset_columns: ColumnDef<Asset>[] = [
  {
    accessorKey: "asset_name",
    header: "Asset Name",
  },
  {
    accessorKey: "category_id",
    header: "Category",
  },
  {
    accessorKey: "sub_category_id",
    header: "Sub Category",
  },
  {
    accessorKey: "type_id", 
    header: "Type"
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
    header: "Condition ID",
  },
  {
    accessorKey: "status_id",
    header: "Status ID",
  },
  {
    accessorKey: "asset_id",
    header: "Asset ID",
  },
  {
    accessorKey: "specifications",
    header: "Specifications",
  },
  {
    accessorKey: "asset_amount",
    header: "Amount",
  },
  {
    accessorKey: "warranty_duration",
    header: "Warranty Duration",
  },
  {
    accessorKey: "warranty_due_date",
    header: "Warranty Due Date",
  },
  {
    accessorKey: "purchase_date",
    header: "Purchase Date",
  },
  {
    id: "aging",
    header: "Aging (days)",
    cell: ({ row }) => {
      const purchaseDate = row.original.purchase_date;
      if (!purchaseDate) return "-";
      const purchase = new Date(purchaseDate);
      const now = new Date();
      const diff = Math.floor((now.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24));
      return diff >= 0 ? diff : "-";
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
  {
    accessorKey: "insurance_id",
    header: "Insurance ID",
  },
];