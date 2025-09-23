import { type ColumnDef } from "@tanstack/react-table";

import type { Asset } from "./types";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
      const diff = Math.floor(
        (now.getTime() - purchase.getTime()) / (1000 * 60 * 60 * 24)
      );
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
