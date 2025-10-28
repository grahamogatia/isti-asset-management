import { type ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, Hash } from "lucide-react";
import { format } from "date-fns";
import {
  createHeaderWithIcon,
  createSortableHeaderWithIcon,
  createStandardFilterFn,
} from "@/lib/columnNameUtils";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import {
  getCompanyName,
  getDepartmentName,
  getEmployeeName,
} from "@/lib/lookups";
import { conditionConfig } from "@/lib/statusStyles";
import { Badge } from "@/components/ui/badge";

// Generic type that covers common fields across Borrow, Repair, and Issuance
type CommonFields = {
  asset_id: number;
  user_id: number;
  company_id: number;
  department_id?: number;
};

export function useCommonColumns<T extends CommonFields>() {
  const {
    getAsset,
    getCategoryName,
    getSubCategoryName,
    getTypeName,
    getConditionName,
  } = useLookupFunctions();

  return {
    asset_name: (): ColumnDef<T> => ({
      id: "asset_name",
      accessorFn: (row) => {
        return getAsset(row.asset_id)?.asset_name;
      },
      header: createSortableHeaderWithIcon("asset_name", "Asset Name"),
      cell: ({ row }) => {
        const asset = getAsset(row.original.asset_id);
        const isDisposed = asset?.status_id === 14;

        return (
          <span className={isDisposed ? "text-red-700/80 font-semibold" : ""}>
            {asset?.asset_name}
          </span>
        );
      },
    }),

    serial_number: (): ColumnDef<T> => ({
      id: "serial_number",
      accessorFn: (row) => {
        return getAsset(row.asset_id)?.serial_number;
      },
      header: createHeaderWithIcon("serial_number", "Serial Number"),
      cell: ({ row }) => {
        return getAsset(row.original.asset_id)?.serial_number;
      },
    }),

    category: (): ColumnDef<T> => ({
      id: "category",
      accessorFn: (row) => {
        const asset = getAsset(row.asset_id);
        if (!asset?.category_id) return;
        return getCategoryName(asset.category_id);
      },
      header: createHeaderWithIcon("category", "Category"),
      cell: ({ row }) => {
        const asset = getAsset(row.original.asset_id);
        if (!asset?.category_id) return;
        return <span>{getCategoryName(asset.category_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) => {
        const asset = getAsset(row.original.asset_id);
        if (!asset?.category_id) return null;
        return getCategoryName(asset.category_id);
      }),
    }),

    employee: (): ColumnDef<T> => ({
      id: "employee",
      accessorFn: (row) => {
        return getEmployeeName(row.user_id);
      },
      header: createHeaderWithIcon("employee", "Employee"),
      cell: ({ row }) => {
        return <span>{getEmployeeName(row.original.user_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) =>
        getEmployeeName(row.original.user_id)
      ),
    }),

    department: (): ColumnDef<T> => ({
      id: "department",
      accessorFn: (row) => {
        return getDepartmentName(row.department_id as number);
      },
      header: createHeaderWithIcon("department", "Department"),
      cell: ({ row }) => {
        return (
          <span>{getDepartmentName(row.original.department_id as number)}</span>
        );
      },
      filterFn: createStandardFilterFn((row) =>
        getDepartmentName(row.original.department_id)
      ),
    }),

    company: (): ColumnDef<T> => ({
      id: "company",
      accessorFn: (row) => {
        return getCompanyName(row.company_id);
      },
      header: createHeaderWithIcon("company", "Company"),
      cell: ({ row }) => {
        return <span>{getCompanyName(row.original.company_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) =>
        getCompanyName(row.original.company_id)
      ),
    }),

    condition: (): ColumnDef<T> => ({
      id: "condition",
      accessorFn: (row) => {
        const asset = getAsset(row.asset_id);
        if (!asset?.asset_condition_id) return;
        return getConditionName(asset.asset_condition_id);
      },
      header: createHeaderWithIcon("condition", "Condition"),
      cell: ({ row }) => {
        const asset = getAsset(row.original.asset_id);
        const conditionName = getConditionName(
          asset?.asset_condition_id as number
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
            variant="secondary"
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{conditionName}</span>
          </Badge>
        );
      },
      filterFn: createStandardFilterFn((row) => {
        const asset = getAsset(row.original.asset_id);
        if (!asset?.asset_condition_id) return null;
        return getConditionName(asset.asset_condition_id);
      }),
    }),

    sub_category: (): ColumnDef<T> => ({
      id: "sub_category",
      accessorFn: (row) => {
        const asset = getAsset(row.asset_id);
        if (!asset?.sub_category_id) return;
        return getSubCategoryName(asset.sub_category_id);
      },
      header: createHeaderWithIcon("sub_category", "Sub Category"),
      cell: ({ row }) => {
        const asset = getAsset(row.original.asset_id);
        if (!asset?.sub_category_id) return;
        return <span>{getSubCategoryName(asset.sub_category_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) => {
        const asset = getAsset(row.original.asset_id);
        if (!asset?.sub_category_id) return null;
        return getSubCategoryName(asset.sub_category_id);
      }),
    }),

    type: (): ColumnDef<T> => ({
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
        return <span>{getTypeName(asset.type_id)}</span>;
      },
      filterFn: createStandardFilterFn((row) => {
        const asset = getAsset(row.original.asset_id);
        if (!asset?.type_id) return null;
        return getTypeName(asset.type_id);
      }),
    }),

    // Date formatter utility
    dateColumn: (accessorKey: keyof T, header: string): ColumnDef<T> => ({
      accessorKey: accessorKey as string,
      header: createHeaderWithIcon(accessorKey as string, header),
      cell: ({ row }) => {
        const date = row.original[accessorKey];
        if (!date || date === "") return "---";
        return format(new Date(date as string), "PP");
      },
    }),

    moneyColumn: (accessorKey: keyof T, header: string): ColumnDef<T> => ({
      accessorKey: accessorKey as string,
      header: createHeaderWithIcon(accessorKey as string, header),
      cell: ({ row }) => {
        const value = row.original[accessorKey];
        return new Intl.NumberFormat("en-PH", {
          style: "currency",
          currency: "PHP",
        }).format(Number(value));
      },
    }),

    simpleColumn: (accessorKey: keyof T, header: string): ColumnDef<T> => ({
      accessorKey: accessorKey as string,
      header: () => (
        <div className="flex items-center gap-2">
          <Hash className="h-4 w-4" />
          {header}
        </div>
      ),
    }),
  };
}
