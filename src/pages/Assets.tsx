import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { asset_columns } from "@/data/asset_columns";
import { asset_categories, asset_testcases } from "@/testcases/assets";
import { asset_sub_categories } from "@/testcases/assets";
import { useMemo, useState } from "react";


function Assets() {

  const getFirstSubCategory = (catName: string) => {
    const cat = asset_categories.find(c => c.category_name === catName);
    if (!cat) return "";
    const sub = asset_sub_categories.find(s => s.category_id === cat.category_id);
    return sub?.sub_category_name || "";
  };
   const handleCategoryChange = (catName: string) => {
    setCategory(catName);
    setSubCategory(getFirstSubCategory(catName));
  };

  const [category, setCategory] = useState<string>(asset_categories[0]?.category_name);
  const [subCategory, setSubCategory] = useState<string>(getFirstSubCategory(category));

  const filteredAsset = useMemo(() => {
    const result1 = asset_categories.find((categoryTest) => categoryTest.category_name === category)
    const result2 = asset_sub_categories.find((subCategoryTest) => subCategoryTest.sub_category_name === subCategory && subCategoryTest.category_id === result1?.category_id)

    if (!result1 || !result2) return [];
    
    return asset_testcases.filter((assetTest) => assetTest.category_id === result1.category_id && assetTest.sub_category_id === result2.sub_category_id );
  }, [category, subCategory]); 



  return (
    <div className="mx-auto w-full">
      <Tabs value={category} className="gap-0" onValueChange={handleCategoryChange}>
        <TabsList>
          {asset_categories.map((cat) => (
            <TabsTrigger key={cat.category_id} value={cat.category_name}>
              {cat.category_name}
            </TabsTrigger>
          ))}
        </TabsList>
        {asset_categories.map((cat) => {
          const subCats = asset_sub_categories.filter((sub) => sub.category_id === cat.category_id);
          return (
            <TabsContent key={cat.category_id} value={cat.category_name}>
              <Tabs value={cat.category_name === category ? subCategory : getFirstSubCategory(cat.category_name)} onValueChange={setSubCategory}>
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
            </TabsContent>
          );
        })}
      </Tabs>
      {/*<DataTable columns={asset_columns} data={sampleAssets}/>*/}
    </div>
  );
}

export default Assets;
