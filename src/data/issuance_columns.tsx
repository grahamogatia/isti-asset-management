import { type ColumnDef } from "@tanstack/react-table";
import type { Issuance } from "./types";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export const issuance_columns: ColumnDef<Issuance>[] = [
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
    header: "Employee",
  },
  {
    accessorKey: "department_id",
    header: "Department",
  },
  {
    accessorKey: "issuance_date",
    header: "Issuance Date",
  },
  {
    accessorKey: "pullout_date",
    header: "Pullout Date",
  },
  {
    accessorKey: "status_id",
    header: "Status",
  },
  {
    accessorKey: "remarks",
    header: "Remarks",
  },
  {
    accessorKey: "issuance_id",
    header: "Issuance ID",
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
    accessorKey: "company_id",
    header: "Company",
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

export const def_issuance_columns = [
  "asset_id",
  "category_id",
  "user_id",
  "department_id",
  "issuance_date",
  "pullout_date",
  "status_id",
  "remarks",
  "actions",
];
