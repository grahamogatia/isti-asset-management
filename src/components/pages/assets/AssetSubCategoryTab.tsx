import { DataTable } from "@/components/ui/data-table";
import { asset_columns, asset_filters, def_asset_columns } from "@/data/asset_columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Asset_Category } from "@/data/types";
   
import { useMemo, useState, useEffect } from "react";
import type { Asset_Type } from "@/data/types";
import AssetTypeDropdown from "./AssetTypeDropdown";
import { asset_categories, asset_sub_categories, asset_types } from "@/testcases/foreignkeys";
import { asset_testcases } from "@/testcases/assets";

const ASSET_TESTCASES = asset_testcases;

function AssetSubCategoryTab({ category }: { category: Asset_Category }) {
  const getFirstSubCategory = (catName: string) => {
    const cat = asset_categories.find((c) => c.category_name === catName);
    if (!cat) return "";
    const sub = asset_sub_categories.find(
      (s) => s.category_id === cat.category_id
    );
    return sub?.sub_category_name || "";
  };

  const [subCategory, setSubCategory] = useState<string>(
    getFirstSubCategory(category.category_name)
  );
  const [selectedType, setSelectedType] = useState<string>("All");

  // Reset selectedType to "All" whenever subCategory changes
  useEffect(() => {
    setSelectedType("All");
  }, [subCategory]);

  const subCats = asset_sub_categories.filter(
    (sub) => sub.category_id === category.category_id
  );

  const filteredAsset = useMemo(() => {
    const result1 = asset_categories.find(
      (categoryTest) => categoryTest.category_name === category.category_name
    );
    const result2 = asset_sub_categories.find(
      (subCategoryTest) =>
        subCategoryTest.sub_category_name === subCategory &&
        subCategoryTest.category_id === result1?.category_id
    );

    if (!result1 || !result2) return [];

    return ASSET_TESTCASES.filter(
      (assetTest) =>
        assetTest.category_id === result1.category_id &&
        assetTest.sub_category_id === result2.sub_category_id
    );
  }, [category, subCategory]);

  const filteredAssetTypes = useMemo<Asset_Type[]>(() => {
    const uniqueTypeIds = Array.from(
      new Set(filteredAsset.map((asset) => asset.type_id))
    );
    return uniqueTypeIds
      .filter((id): id is number => typeof id === "number")
      .map((type_id) => {
        // Get the type information from the foreign keys data
        const assetType = asset_types.find((type) => type.type_id === type_id);
        if (assetType) {
          return assetType;
        }
        
        // Fallback if type not found in foreign keys
        const asset = filteredAsset.find((a) => a.type_id === type_id);
        const subCat = asset_sub_categories.find((sc) => sc.sub_category_id === asset?.sub_category_id);
        return {
          type_id,
          type_name: `Type ${type_id}`,
          type_code: undefined,
          sub_category_id: asset?.sub_category_id || 0,
          sub_category_name: subCat?.sub_category_name || "",
          code: subCat?.code || "",
          category_id: asset?.category_id || 0,
          category_name: (subCat?.category_name || "Internal") as "Internal" | "External" | "Events",
        };
      });
  }, [category, subCategory, filteredAsset]);

  const displayedAssets = useMemo(() => {
    if (selectedType === "All") return filteredAsset;
    return filteredAsset.filter((asset) => {
      return String(asset.type_id) === selectedType;
    });
  }, [filteredAsset, selectedType]);

  const dynamicDefaultColumns = useMemo(() => {
    const baseColumns = def_asset_columns;
    if (category.category_name === "External") {
      return [...baseColumns, "location"];
    }
    return [...baseColumns, "actions"];
  }, [category.category_name]);

  return (
    <Tabs value={subCategory} onValueChange={setSubCategory} className="gap-0 px-5 pl-5">
        <TabsList className="gap-2 overflow-x-auto max-w-full">
          {subCats.map((sub) => (
            <TabsTrigger
              key={sub.sub_category_id}
              value={sub.sub_category_name}
              className="whitespace-nowrap flex-shrink-0 data-[state=active]:font-bold"
            >
              {sub.sub_category_name}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="border rounded-2xl py-3.5 p-5 mt-3.5">
        {subCats.map((sub) => (
          <TabsContent key={sub.sub_category_id} value={sub.sub_category_name}>
            <DataTable
              columns={asset_columns}
              data={displayedAssets}
              defaultVisibleColumns={dynamicDefaultColumns}
              filterableColumns={asset_filters}
            >
              <AssetTypeDropdown
                assetTypes={filteredAssetTypes}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
              />
            </DataTable>
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

export default AssetSubCategoryTab;
