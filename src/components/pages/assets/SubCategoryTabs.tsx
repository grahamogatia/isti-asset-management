import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Asset_Sub_Category } from "@/data/types";

interface SubCategoryTabsProps {
  subCategories: Asset_Sub_Category[];
}

function SubCategoryTabs({ subCategories }: SubCategoryTabsProps) {
  return (
    <TabsList className="gap-2 overflow-x-auto max-w-full">
      {subCategories.map((sub) => (
        <TabsTrigger
          key={sub.sub_category_id}
          value={sub.sub_category_name}
          className="whitespace-nowrap flex-shrink-0 data-[state=active]:font-bold"
        >
          {sub.sub_category_name}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}

export default SubCategoryTabs;