import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useCategories, useSubCategories, useTypes } from "@/hooks/useCategory";
import { ChevronDown, Plus } from "lucide-react";

function CategoriesPage() {
  const { data: categories } = useCategories();
  const { data: subCategories } = useSubCategories();
  const { data: types } = useTypes();

  function formatTypeName(name: string) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }

  function onAddCategory() {}

  function onAddSubCategory() {}

  function onAddType() {}

  return (
    <>
      <h1 className="font-semibold tracking-tight text-zinc-950 pb-4">
        Categories Management
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue={categories ? categories[0].category_name : ""}
      >
        {categories?.map((category) => (
          <AccordionItem
            key={category.category_id}
            value={category.category_name}
            className="overflow-hidden border bg-background first:rounded-t-lg last:rounded-b-lg last:border-b"
          >
            <AccordionTrigger className="px-4 py-3 text-md hover:no-underline">
              {category.category_name}
            </AccordionTrigger>
            <AccordionContent className="p-0 bg-zinc-100 ">
              {/* Subcategories */}
              <div className="pl-3 pb-3">
                {subCategories
                  ?.filter(
                    (subCat) => category.category_id === subCat.category_id
                  )
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
                        {/* Types */}
                        <div className="pt-2 ml-6 mr-6">
                          {types
                            ?.filter(
                              (type) =>
                                subCat.sub_category_id === type.sub_category_id
                            )
                            .map((type) => (
                              <div className="border-t p-2">
                                {formatTypeName(type.type_name)}
                              </div>
                            ))}
                          <Button
                            className=" w-full gap-2 border-t text-sm justify-start rounded-none bg-zinc-100"
                            variant="ghost"
                          >
                            <Plus />
                            Type
                          </Button>
                        </div>
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
            </AccordionContent>
          </AccordionItem>
        ))}
        <AccordionItem
          value="Add Button"
          className="overflow-hidden border bg-background first:rounded-t-lg last:rounded-b-lg last:border-b pl-1"
        >
          <Button
            className="px-4 py-3 w-full gap-2 text-zinc-500 justify-start"
            variant="ghost"
            style={{ background: "transparent" }}
          >
            <Plus />
            Category
          </Button>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default CategoriesPage;
