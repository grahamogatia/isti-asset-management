import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { asset_categories } from "@/testcases/foreignkeys";
import { useState } from "react";
import AssetSubCategoryTab from "../components/pages/assets/AssetSubCategoryTab";

function Assets() {
  const [category, setCategory] = useState<string>(
    asset_categories[0]?.category_name
  );

  return (
    <div className="mx-auto w-full">
      <Tabs value={category} className="gap-0" onValueChange={setCategory}>
        <TabsList className="bg-transparent p-0 h-auto mb-2 flex items-center gap-2">
          {asset_categories.map((cat, index) => (
            <>
              <TabsTrigger 
                key={cat.category_id} 
                value={cat.category_name}
                className="bg-transparent border-none shadow-none data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:shadow-none px-7 text-sm font-medium h-0 w-auto transition-all"
              >
                {cat.category_name}
              </TabsTrigger>
              {index < asset_categories.length - 1 && (
                <p className="opacity-25">|</p>
              )}
            </>
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
