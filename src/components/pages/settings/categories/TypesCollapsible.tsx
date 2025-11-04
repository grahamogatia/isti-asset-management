import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { AssetTypeSchema } from "@/data/schemas";
import type { Asset_Category, Asset_Sub_Category, Asset_Type } from "@/data/types";
import { useTypes } from "@/hooks/useCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldText from "../../forms/fields/FormFieldText";

interface TypesCollapsibleProps {
  category: Asset_Category;
  subCat: Asset_Sub_Category;
}

function TypesCollapsible({ category, subCat }: TypesCollapsibleProps) {

  const form = useForm<Asset_Type>({
    resolver: zodResolver(AssetTypeSchema),
    defaultValues: {
      type_name: undefined,
      type_code: undefined,
    }
  })

  const { data: types } = useTypes();

  function formatTypeName(name: string) {
    if (!name) return "";
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  
  function onAddType() {}

  return (
    <div className="pt-2 ml-6 mr-6">
      {types
        ?.filter(
          (type) =>
            category.category_id === type.category_id &&
            subCat.sub_category_id === type.sub_category_id
        )
        .map((type) => (
          <div className="border-t p-2">{formatTypeName(type.type_name)}</div>
        ))}

      <PopoverForm
        triggerButton={
          <Button
            className=" w-full gap-2 border-t text-sm justify-start rounded-none bg-zinc-100"
            variant="ghost"
          >
            <Plus />
            Type
          </Button>
        }
        title={`New ${subCat.sub_category_name} Type`}
        description="Add a new type to organize your assets."
        form={form}
        onSubmit={onAddType}
        submitButtonText="Add"
        submitButtonIcon={<Plus className="mr-2 h-4 w-4" />}
        formId="type-form"
      >
        <FormFieldText
        control={form.control}
        name="type_name"
        label="Name"
        placeholder="e.g. Desktop, Laptop"
        />
        <FormFieldText
        control={form.control}
        name="code"
        label="Code"
        placeholder="e.g. DPT, LPT"
        />
      </PopoverForm>
    </div>
  );
}

export default TypesCollapsible;
