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
  setSelectedType 
}: AssetDataTableProps) {
  const dynamicDefaultColumns = useMemo(() => {
    const baseColumns = def_asset_columns;
    if (category.category_name === "External") {
      return [...baseColumns, "location"];
    }
    return [...baseColumns, "actions"];
  }, [category.category_name]);

  const columns = useAssetColumns();
  console.log(columns)

  return (
    <DataTable
      columns={columns}
      data={assets}
      defaultVisibleColumns={dynamicDefaultColumns}
      filterableColumns={asset_filters}
      type="Asset"
      form={<AssetForm />}
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