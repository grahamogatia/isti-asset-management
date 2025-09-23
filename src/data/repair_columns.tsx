import { type ColumnDef } from "@tanstack/react-table";

import type { Asset, Repair } from "./types";
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

export const repair_columns: ColumnDef<Repair>[] = [
  {
    accessorKey: "asset_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset Id
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
    accessorKey: "user_id",
    header: "User",
  },
  {
    accessorKey: "department_id",
    header: "Department",
  },
  {
    accessorKey: "issue",
    header: "Issue",
  },
  {
    accessorKey: "urgency_id",
    header: "Urgency",
  },
  {
    accessorKey: "status_id",
    header: "Status",
  },
  {
    accessorKey: "repair_request_id",
    header: "Repair Request Id",
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
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "date_reported",
    header: "Date Reported",
  },
  {
    accessorKey: "repair_start_date",
    header: "Repair Start Date",
  },
  {
    accessorKey: "repair_completion_date",
    header: "Repair Completion Date",
  },
  {
    accessorKey: "repair_cost",
    header: "Repair Cost",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

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

export const def_repair_columns = [
  "asset_id",
  "category_id",
  "user_id",
  "department_id",
  "issue",
  "urgency_id",
  "status_id",
];
