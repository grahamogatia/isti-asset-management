import { Tabs, TabsContent } from "@/components/ui/tabs";
import type { Asset_Category } from "@/data/types";
import { useAssetFiltering } from "@/hooks/useAssetFiltering";
import SubCategoryTabs from "./SubCategoryTabs";
import AssetDataTable from "./AssetDataTable";

interface AssetSubCategoryTabProps {
  category: Asset_Category;
}

function AssetSubCategoryTab({ category }: AssetSubCategoryTabProps) {
  const {
    subCategory,
    setSubCategory,
    selectedType,
    setSelectedType,
    subCats,
    filteredAssetTypes,
    displayedAssets,
  } = useAssetFiltering(category);

  return (
    <Tabs
      value={subCategory}
      onValueChange={setSubCategory}
      className="gap-0 px-5 pl-5"
    >
      <SubCategoryTabs subCategories={subCats} />

      <div className="border rounded-2xl py-3.5 p-5 mt-3.5">
        {subCats.map((sub) => (
          <TabsContent key={sub.sub_category_id} value={sub.sub_category_name}>
            <AssetDataTable
              assets={displayedAssets}
              category={category}
              assetTypes={filteredAssetTypes}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}

export default AssetSubCategoryTab;
