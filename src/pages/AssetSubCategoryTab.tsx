import { DataTable } from "@/components/ui/data-table";
import { asset_columns } from "@/data/asset_columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Asset_Category } from "@/data/types";
import {
  asset_categories,
  asset_sub_categories,
  asset_testcases,
} from "@/testcases/assets";
import { useMemo, useState } from "react";

function AssetSubCategoryTab({ category }: { category: Asset_Category}) {

  const getFirstSubCategory = (catName: string) => {
    const cat = asset_categories.find((c) => c.category_name === catName);
    if (!cat) return "";
    const sub = asset_sub_categories.find(
      (s) => s.category_id === cat.category_id
    );
    return sub?.sub_category_name || "";
  };

  const [subCategory, setSubCategory] = useState<string>(getFirstSubCategory(category.category_name));
  const subCats = asset_sub_categories.filter((sub) => sub.category_id === category.category_id);

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

    return asset_testcases.filter(
      (assetTest) =>
        assetTest.category_id === result1.category_id &&
        assetTest.sub_category_id === result2.sub_category_id
    );
  }, [category, subCategory]);

  return (
    <Tabs
      value={subCategory}
      onValueChange={setSubCategory}
    >
      <TabsList>

        {subCats.map((sub) => (
          <TabsTrigger key={sub.sub_category_id} value={sub.sub_category_name}>
            {sub.sub_category_name}
          </TabsTrigger>
        ))}
      </TabsList>
      {subCats.map((sub) => (
        <TabsContent key={sub.sub_category_id} value={sub.sub_category_name}>
          <DataTable columns={asset_columns} data={filteredAsset} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

export default AssetSubCategoryTab;
