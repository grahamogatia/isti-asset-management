import { type ColumnDef } from "@tanstack/react-table";
import { differenceInMonths, format } from "date-fns";
import type { Asset } from "./types";
import { Button } from "@/components/ui/button";
import { 
  ArrowUpDown, 
  MoreHorizontal,
  Hash,
  Package,
  Tag,
  Layers,
  FileText,
  Cpu,
  Award,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Clock,
  Calendar,
  TrendingDown,
  FileImage,
  Shield,
  MapPin,
  ScrollText,
  PhilippinePeso
} from "lucide-react";
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
    header: () => (
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4" />
        Asset ID
      </div>
    ),
  },
  {
    accessorKey: "asset_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2"
        >
          <Package className="h-4 w-4" />
          Asset Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "category_id",
    header: () => (
      <div className="flex items-center gap-2">
        <Layers className="h-4 w-4" />
        Category
      </div>
    ),
    cell: ({ row }) => {
      const categoryId = row.original.category_id;
      return getCategoryName(categoryId);
    },
  },
  {
    accessorKey: "sub_category_id",
    header: () => (
      <div className="flex items-center gap-2">
        <Tag className="h-4 w-4" />
        Sub Category
      </div>
    ),
    cell: ({ row }) => {
      const subCategoryId = row.original.sub_category_id;
      return getSubCategoryName(subCategoryId);
    },
  },
  {
    accessorKey: "type_id",
    header: () => (
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4" />
        Type
      </div>
    ),
    cell: ({ row }) => {
      const typeId = row.original.type_id;
      return typeId ? getTypeName(typeId) : "-";
    },
  },
  {
    accessorKey: "file",
    header: () => (
      <div className="flex items-center gap-2">
        <FileImage className="h-4 w-4" />
        File
      </div>
    ),
  },
  {
    accessorKey: "serial_number",
    header: () => (
      <div className="flex items-center gap-2">
        <Hash className="h-4 w-4" />
        Serial Number
      </div>
    ),
  },
  {
    accessorKey: "brand",
    header: () => (
      <div className="flex items-center gap-2">
        <Award className="h-4 w-4" />
        Brand
      </div>
    ),
  },
  {
    accessorKey: "asset_condition_id",
    accessorFn: (row) => {
      return getConditionName(row.asset_condition_id);
    },
    header: () => (
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4" />
        Condition
      </div>
    ),
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
    header: () => (
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Status
      </div>
    ),
    cell: ({ row }) => {
      const statusId = row.original.status_id;
      return getStatusName(statusId);
    },
  },
  {
    accessorKey: "specifications",
    header: () => (
      <div className="flex items-center gap-2">
        <Cpu className="h-4 w-4" />
        Specifications
      </div>
    ),
  },
  {
    accessorKey: "asset_amount",
    header: () => (
      <div className="flex items-center gap-2">
        <PhilippinePeso className="h-4 w-4" />
        Amount
      </div>
    ),
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
    header: () => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Warranty Remaining
      </div>
    ),
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
    header: () => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Warranty Due Date
      </div>
    ),
    cell: ({ row }) => {
      return format(new Date(row.original.warranty_due_date), "PP");
    },
  },
  {
    accessorKey: "purchase_date",
    header: () => (
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4" />
        Purchase Date
      </div>
    ),
    cell: ({ row }) => {
      return format(new Date(row.original.purchase_date), "PP");
    },
  },
  {
    id: "aging",
    header: () => (
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        Age
      </div>
    ),
    cell: ({ row }) => {
      const purchaseDate = row.original.purchase_date;
      if (!purchaseDate) return "-";
      const purchase = new Date(purchaseDate);
      return differenceInMonths(new Date(), purchase) + " months";
    },
  },
  {
    id: "asset_value",
    header: () => (
      <div className="flex items-center gap-2">
        <TrendingDown className="h-4 w-4" />
        Asset Value
      </div>
    ),
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
    header: () => (
      <div className="flex items-center gap-2">
        <ScrollText className="h-4 w-4" />
        Notes
      </div>
    ),
  },
  {
    accessorKey: "insurance_id",
    accessorFn: (row) => { 
      if (!row.insurance_id) return;
      return getInsuranceName(row.insurance_id)
    },
    header: () => (
      <div className="flex items-center gap-2">
        <Shield className="h-4 w-4" />
        Insurance
      </div>
    ),
    cell: ({ row }) => {
      if (!row.original.insurance_id) return;
      return getInsuranceName(row.original.insurance_id);
    },
  },
  {
    accessorKey: "location",
    header: () => (
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Location
      </div>
    ),
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

export const asset_filters = [
  "condition",
  "status",
  "asset_amount",
  "purchase_date",
  "insurance_id",
  "location"
]