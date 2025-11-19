import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Asset_Category, Asset_Sub_Category } from "@/data/types";
import { useAddSubCategory, useSubCategories } from "@/hooks/useCategory";
import { ChevronDown, Plus } from "lucide-react";
import TypesCollapsible from "./TypesCollapsible";
import { AssetSubCategorySchema } from "@/data/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldText from "../../forms/fields/FormFieldText";
import PopoverForm from "@/components/layout/PopoverForm";
import UpdateSubCategoryForm from "../../forms/update/UpdateSubcategoryForm";
import FormPopoverTrigger from "@/components/ui/form-popover-trigger";

function SubCategoriesCollapsible({ category }: { category: Asset_Category }) {
  const form = useForm<Asset_Sub_Category>({
    resolver: zodResolver(AssetSubCategorySchema),
    defaultValues: {
      category_id: category.category_id,
      category_name: category.category_name,
      sub_category_name: undefined,
      code: undefined,
    },
  });

  const { data: subCategories } = useSubCategories();
  const { mutate } = useAddSubCategory();

  function onAddSubCategory(values: Asset_Sub_Category) {
    mutate(values);
  }

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
              <div className="flex justify-between items-center group">
                <div className="flex gap-3">
                  <ChevronDown
                    aria-hidden="true"
                    className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
                    size={16}
                    strokeWidth={2}
                  />
                  {subCat.sub_category_name}
                </div>
                <UpdateSubCategoryForm subCategory={subCat} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden text-muted-foreground text-sm transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down ">
              <TypesCollapsible category={category} subCat={subCat} />
            </CollapsibleContent>
          </Collapsible>
        ))}

      <PopoverForm
        triggerButton={
          <FormPopoverTrigger icon={Plus} name="Sub Category" variant="ghost" />
        }
        title={`New ${category.category_name} Sub Category`}
        description="Add a new sub category to organize your assets."
        form={form}
        onSubmit={onAddSubCategory}
        submitButtonText="Add"
        submitButtonIcon={<Plus className="mr-2 h-4 w-4" />}
        formId="sub-category-form"
      >
        <FormFieldText
          control={form.control}
          name="sub_category_name"
          label="Name"
          placeholder="e.g. Computers, Network Devices"
        />
        <FormFieldText
          control={form.control}
          name="code"
          label="Code"
          placeholder="e.g. CPT, NWD"
        />
      </PopoverForm>
    </div>
  );
}

export default SubCategoriesCollapsible;
