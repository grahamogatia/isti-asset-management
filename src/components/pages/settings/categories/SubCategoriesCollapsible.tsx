import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import type { Asset_Category } from "@/data/types";
import { useSubCategories } from "@/hooks/useCategory";
import { ChevronDown, Plus } from "lucide-react";
import TypesCollapsible from "./TypesCollapsible";

function SubCategoriesCollapsible({category}: {category: Asset_Category}) {
  const { data: subCategories } = useSubCategories();

  return (
    <div className="pl-3 pb-3">
      {subCategories
        ?.filter((subCat) => category.category_id === subCat.category_id)
        .map((subCat) => (
          <Collapsible
            className="space-y-1 border-border border-t px-4 py-3 "
            key={subCat.sub_category_id}
          >
            <CollapsibleTrigger className="flex gap-2 font-medium [&[data-state=open]>svg]:rotate-180">
              <ChevronDown
                aria-hidden="true"
                className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
                size={16}
                strokeWidth={2}
              />
              {subCat.sub_category_name}
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden text-muted-foreground text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down ">
                <TypesCollapsible category={category} subCat={subCat}/>
            </CollapsibleContent>
          </Collapsible>
        ))}

      <Button
        className="px-4 py-3 w-full  gap-3 border-t justify-start text-zinc-500 rounded-none bg-zinc-100"
        variant="ghost"
      >
        <Plus className="ml-1" />
        Sub Category
      </Button>
    </div>
  );
}

export default SubCategoriesCollapsible;
