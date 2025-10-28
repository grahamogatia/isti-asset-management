import { DataTable } from "@/components/ui/data-table";
import {
  asset_filters,
  def_asset_columns,
  useAssetColumns,
} from "@/data/asset_columns";
import { useEffect, useMemo, useState } from "react";
import type { Asset, Asset_Category, Asset_Type } from "@/data/types";
import AssetTypeDropdown from "./AssetTypeDropdown";
import AssetForm from "../forms/create/AssetForm";
import type { VisibilityState } from "@tanstack/react-table";

interface AssetDataTableProps {
  assets: Asset[];
  category: Asset_Category;
  assetTypes: Asset_Type[];
  selectedType: string;
  setSelectedType: (type: string) => void;
}

function AssetDataTable({
  assets,
  category,
  assetTypes,
  selectedType,
  setSelectedType,
}: AssetDataTableProps) {
  const isExternal = category.category_name === "External";
  const columns = useAssetColumns(isExternal);

  const dynamicDefaultColumns = useMemo(() => {
    const baseColumns = def_asset_columns;
    return isExternal ? [...baseColumns, "location"] : [...baseColumns];
  }, [isExternal]);

  const filterable = useMemo(
    () => (isExternal ? asset_filters : asset_filters.filter((c) => c !== "location")),
    [isExternal]
  );

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    () => {
      const saved = localStorage.getItem(
        `assets-column-visibility-${category.category_name}`
      );

      if (saved) {
        return JSON.parse(saved);
      }

      // Create initial visibility from dynamicDefaultColumns
      const initialVisibility: VisibilityState = {};

      columns.forEach((column: any) => {
        const columnKey = column.accessorKey || column.id;
        if (columnKey) {
          initialVisibility[columnKey] =
            dynamicDefaultColumns.includes(columnKey);
        }
      });

      return initialVisibility;
    }
  );

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      `assets-column-visibility-${category.category_name}`,
      JSON.stringify(columnVisibility)
    );
  }, [columnVisibility, category.category_name]);

  return (
    <DataTable
      columns={columns}
      data={assets}
      defaultVisibleColumns={dynamicDefaultColumns}
      filterableColumns={filterable}
      type="Asset"
      form={<AssetForm />}
      columnVisibility={columnVisibility}
      onColumnVisibilityChange={setColumnVisibility}
    >
      <AssetTypeDropdown
        assetTypes={assetTypes}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />
    </DataTable>
  );
}

export default AssetDataTable;
