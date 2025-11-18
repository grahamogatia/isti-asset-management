import { DataTable } from "@/components/ui/data-table";
import {
  asset_filters,
  def_asset_columns,
  useAssetColumns,
} from "@/data/asset_columns";
import { useMemo } from "react";
import type { Asset, Asset_Category, Asset_Type } from "@/data/types";
import AssetTypeDropdown from "./AssetTypeDropdown";
import AssetForm from "../forms/create/AssetForm";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";

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
    () =>
      isExternal
        ? asset_filters
        : asset_filters.filter((c) => c !== "location"),
    [isExternal]
  );

  const [columnVisibility, setColumnVisibility] = useColumnVisibility(
    "asset-column-visibility",
    columns,
    def_asset_columns
  );

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
      hasAssetBatchUpload={true}
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
