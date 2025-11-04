import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { useCategories } from "@/hooks/useCategory";
import { Plus } from "lucide-react";
import SubCategoriesCollapsible from "./SubCategoriesCollapsible";
import PopoverForm from "@/components/layout/PopoverForm";
import type { Asset_Category } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AssetCategorySchema } from "@/data/schemas";
import { useForm } from "react-hook-form";
import FormFieldText from "../../forms/fields/FormFieldText";

function CategoriesPage() {
  const form = useForm<Asset_Category>({
    resolver: zodResolver(AssetCategorySchema),
    defaultValues: {
      category_name: undefined,
    }
  })
  const { data: categories } = useCategories();

  function onAddCategory() {}

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
          <PopoverForm
            triggerButton={
              <Button
                className="px-4 py-3 w-full gap-2 text-zinc-500 justify-start"
                type="submit"
                variant="ghost"
                style={{ background: "transparent" }}
              >
                <Plus />
                Category
              </Button>
            }
            title="Categories"
            description="Add a new category to organize your assets."
            form={form}
            onSubmit={onAddCategory}
            submitButtonText="Add"
            submitButtonIcon={<Plus className="mr-2 h-4 w-4" />}
            formId="category-form"
          >
            <FormFieldText
            control={form.control}
            name="category_name"
            label="Category Name"
            placeholder="Enter Category Name"
            />
          </PopoverForm>
        </AccordionItem>
      </Accordion>
    </>
  );
}

export default CategoriesPage;
