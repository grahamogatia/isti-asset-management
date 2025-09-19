import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { asset_categories } from "@/testcases/assets";
import { useState } from "react";
import AssetSubCategoryTab from "../components/pages/assets/AssetSubCategoryTab";

function Assets() {
  const [category, setCategory] = useState<string>(
    asset_categories[0]?.category_name
  );

  return (
    <div className="mx-auto w-full">
      <Tabs value={category} className="gap-0" onValueChange={setCategory}>
        <TabsList>
          {asset_categories.map((cat) => (
            <TabsTrigger key={cat.category_id} value={cat.category_name}>
              {cat.category_name}
            </TabsTrigger>
          ))}
        </TabsList>
        {asset_categories.map((cat) => {
          return (
            <TabsContent key={cat.category_id} value={cat.category_name}>
              <AssetSubCategoryTab category={cat} />
            </TabsContent>
          );
        })}
      </Tabs>
      {/*<DataTable columns={asset_columns} data={sampleAssets}/>*/}
    </div>
  );
}

export default Assets;
