import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { useCategories} from "@/hooks/useCategory";
import { Plus } from "lucide-react";
import SubCategoriesCollapsible from "./SubCategoriesCollapsible";

function CategoriesPage() {
  const { data: categories } = useCategories();

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
              <SubCategoriesCollapsible category={category} />
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
