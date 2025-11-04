import { Button } from "@/components/ui/button";
import type { Asset_Category, Asset_Sub_Category } from "@/data/types";
import { useTypes } from "@/hooks/useCategory";
import { Plus } from "lucide-react";

interface TypesCollapsibleProps {
    category: Asset_Category;
    subCat: Asset_Sub_Category;
}

function TypesCollapsible({ category, subCat }: TypesCollapsibleProps) {

  const { data: types } = useTypes();
  function formatTypeName(name: string) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  return (
    <div className="pt-2 ml-6 mr-6">
      {types
        ?.filter((type) => category.category_id === type.category_id && subCat.sub_category_id === type.sub_category_id)
        .map((type) => (
          <div className="border-t p-2">{formatTypeName(type.type_name)}</div>
        ))}
      <Button
        className=" w-full gap-2 border-t text-sm justify-start rounded-none bg-zinc-100"
        variant="ghost"
      >
        <Plus />
        Type
      </Button>
    </div>
  );
}

export default TypesCollapsible;
