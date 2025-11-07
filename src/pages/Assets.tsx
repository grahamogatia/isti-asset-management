import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import AssetSubCategoryTab from "../components/pages/assets/AssetSubCategoryTab";
import { Separator } from "@/components/ui/separator";
import { useCategories } from "@/hooks/useCategory";
import { Outlet } from "react-router-dom";

function Assets() {
  const { data: categories = [], isLoading } = useCategories();

  const [category, setCategory] = useState<string>();


  useEffect(() => {
    if (!categories && isLoading) return;
    setCategory(categories[0]?.category_name);
  }, [categories, isLoading]);

  return (
    <div className="mx-auto w-full">
    <Tabs value={category} className="gap-0" onValueChange={setCategory}>
        <div className="w-fit p-3 pt-2 pl-5">
          <TabsList className="bg-transparent p-0 h-auto mb-2 flex items-center gap-2">
            {categories.map((cat, index) => (
              <>
                <TabsTrigger
                  key={cat.category_id}
                  value={cat.category_name}
                  className="bg-transparent border-none shadow-none data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:shadow-none px-2 text-sm font-medium h-auto w-auto transition-all"
                >
                  {cat.category_name}
                </TabsTrigger>
                {index < categories.length - 1 && (
                  <p className="opacity-25">|</p>
                )}
              </>
            ))}
          </TabsList>
          <Separator />
        </div>

        {categories.map((cat) => {
          return (
            <TabsContent key={cat.category_id} value={cat.category_name}>
              <AssetSubCategoryTab category={cat} />
            </TabsContent>
          );
        })}
      </Tabs>
      <Outlet/>
    </div>
  );
}

export default Assets;
