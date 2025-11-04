import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import type { Asset_Category, Asset_Sub_Category } from "@/data/types";
import { useSubCategories } from "@/hooks/useCategory";
import { ChevronDown, Plus } from "lucide-react";
import TypesCollapsible from "./TypesCollapsible";
import { AssetSubCategorySchema } from "@/data/schemas";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormFieldText from "../../forms/fields/FormFieldText";
import PopoverForm from "@/components/layout/PopoverForm";

function SubCategoriesCollapsible({ category }: { category: Asset_Category }) {
  const form = useForm<Asset_Sub_Category>({
    resolver: zodResolver(AssetSubCategorySchema),
    defaultValues: {
      sub_category_name: undefined,
      code: undefined,
    },
  });

  const { data: subCategories } = useSubCategories();

  function onAddSubCategory() {}

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
              <TypesCollapsible category={category} subCat={subCat} />
            </CollapsibleContent>
          </Collapsible>
        ))}

      <PopoverForm
        triggerButton={
          <Button
            className="px-4 py-3 w-full  gap-3 border-t justify-start text-zinc-500 rounded-none bg-zinc-100"
            variant="ghost"
          >
            <Plus className="ml-1" />
            Sub Category
          </Button>
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
