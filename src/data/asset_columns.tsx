import { type ColumnDef } from "@tanstack/react-table";
import { differenceInMonths, format } from "date-fns";
import type { Asset } from "./types";
import {
  createHeaderWithIcon,
  createSortableHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";

import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { ButtonGroup } from "@/components/ui/button-group";
import DeleteAssetForm from "@/components/pages/forms/delete/DeleteAssetForm";
import ImageDialog from "@/components/ui/image-dialog";
import UpdateAssetForm from "@/components/pages/forms/update/UpdateAssetForm";
import FormSheet from "@/components/layout/FormSheet";
import {
  SquarePen,
  CircleX,
  AlertTriangle,
  ImageOff,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { conditionConfig, statusConfig } from "@/lib/statusStyles";
import { useSettings } from "@/hooks/useSettings";
import { useMemo } from "react";
import FormSheetTrigger from "@/components/ui/form-sheet-trigger";

export function useAssetColumns(showLocation = true): ColumnDef<Asset>[] {
  const { getConditionName, getStatusName, getInsurance } =
    useLookupFunctions();
  const { data: settings, isLoading: settingsLoading } = useSettings();

  const getSettingValue = (key: string) =>
    settings?.find((s) => s.settings_key === key)?.value;

  const depreciation = useMemo<number | undefined | null>(() => {
    if (settingsLoading) return null;
    const depRaw = getSettingValue("depreciation");
    if (depRaw === undefined || depRaw === null || depRaw === "")
      return undefined;
    const num = Number(depRaw);
    return Number.isFinite(num) ? num : undefined;
  }, [settings, settingsLoading]);


  const columns: ColumnDef<Asset>[] = [
    {
      accessorKey: "file",
      header: createHeaderWithIcon("file", "Image"),
      cell: ({ row }) => {
        const images: string[] = row.getValue("file");

        if (images.length === 0) {
          return (
            <ImageOff className="h-6 text-muted-foreground flex justify-center items-center w-full" />
          );
        }

        return (
          <ImageDialog
            asset_id={row.original.asset_id as number}
            images={images}
          />
        );
      },
    },
    {
      accessorKey: "asset_name",
      header: createSortableHeaderWithIcon("asset_name", "Name"),
    },
    {
      accessorKey: "serial_number",
      header: createHeaderWithIcon("serial_number", "Serial Number"),
    },
    {
      accessorKey: "brand",
      header: createHeaderWithIcon("brand", "Brand"),
    },
    {
      accessorKey: "condition",
      accessorFn: (row) =>
        row.asset_condition_id
          ? getConditionName(row.asset_condition_id)
          : null,
      header: createHeaderWithIcon("condition", "Condition"),
      cell: ({ row }) => {
        const conditionName = getConditionName(
          row.original.asset_condition_id as number
        );
        const key = conditionName as keyof typeof conditionConfig;
        const config = conditionConfig[key] ?? {
          icon: AlertTriangle,
          color: "bg-gray-100 text-gray-600",
        };
        const Icon = config.icon;

        return (
          <Badge
            className={`flex items-center gap-1 px-2 py-1`}
            variant="outline"
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{conditionName}</span>
          </Badge>
        );
      },
      filterFn: createStandardFilterFn((row) =>
        row.original.asset_condition_id
          ? getConditionName(row.original.asset_condition_id)
          : null
      ),
    },
    {
      accessorKey: "status",
      accessorFn: (row) =>
        row.status_id ? getStatusName(row.status_id) : null,
      header: createHeaderWithIcon("status", "Status"),
      cell: ({ row }) => {
        const statusName = getStatusName(row.original.status_id as number);
        const key = statusName as keyof typeof statusConfig;
        const config = statusConfig[key] ?? {
          icon: CircleX,
          color: "bg-gray-100 text-gray-600",
        };
        const Icon = config.icon;

        return (
          <Badge
            className={`flex items-center gap-1 px-2 py-1 ${config.color}`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{statusName}</span>
          </Badge>
        );
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
        if (result <= 0) {
          return (
            <Badge
              variant="destructive"
              className="flex items-center gap-1 px-2 py-1"
            >
              <CircleX className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">Warranty Void</span>
            </Badge>
          );
        }

        return result + " months";
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
        const purchaseDate = row.original.purchase_date;
        const amt = row.original.asset_amount ?? 0;

        if (!purchaseDate) return "-";
        const purchase = new Date(purchaseDate);
        const age = differenceInMonths(new Date(), purchase);

        if (depreciation === null) {
          return <span className="text-muted-foreground">Loading...</span>;
        }

        let value: number;
        if (depreciation === undefined) {
          value = amt;
        } else if (age > depreciation) {
          value = 0;
        } else {
          value = amt - (amt / depreciation) * age;
        }

        const formatted = Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(value);

        return (
          <div className="flex items-center gap-2">
            <span>{formatted}</span>
            {value === 0 && typeof depreciation === "number" && (
              <Badge className="text-xs bg-red-700">
                Depreciated
              </Badge>
            )}
          </div>
        );

      },
    },
    {
      id: "insurance_id",
      header: createHeaderWithIcon("insurance_id", "Insurance"),
      cell: ({ row }) => {
        const insurance = getInsurance(row.original.insurance_id as number);

        return insurance?.insurance_name;
      },
    },
    {
      accessorKey: "notes",
      header: createHeaderWithIcon("notes", "Notes"),
    },
  ];
  if (showLocation) {
    columns.push({
      accessorKey: "location",
      header: createHeaderWithIcon("location", "Location"),
      filterFn: createStandardFilterFn((row) => row.original.location),
    });
  }

  columns.push({
    id: "actions",
    cell: ({ row }) => {
      return (
        <ButtonGroup className="hidden sm:flex">
          <FormSheet
            type={"Asset Inventory"}
            taskName="Update"
            button={<FormSheetTrigger icon={SquarePen} name="Update Asset" />}
            form={<UpdateAssetForm asset={row.original} />}
          />
          <DeleteAssetForm asset={row.original} />
        </ButtonGroup>
      );
    },
  });

  return columns;
}

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
