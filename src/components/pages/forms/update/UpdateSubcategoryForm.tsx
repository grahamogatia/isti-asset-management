import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { AssetSubCategorySchema } from "@/data/schemas";
import type { Asset_Sub_Category } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldText from "../fields/FormFieldText";
import { Badge } from "@/components/ui/badge";

interface UpdateSubCategoryFormProps {
  subCategory: Asset_Sub_Category;
}

function UpdateSubCategoryForm({ subCategory }: UpdateSubCategoryFormProps) {
  const form = useForm<Asset_Sub_Category>({
    resolver: zodResolver(AssetSubCategorySchema),
    defaultValues: {
      ...subCategory,
    },
    mode: "all",
  });

  function onSubmit(values: Asset_Sub_Category) {}

  return (
    <PopoverForm
      triggerButton={
        <Button
          variant="ghost"
          className="hover:bg-transparent opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 p-1"
          aria-label={`Edit ${subCategory.sub_category_name}`}
          title={`Edit ${subCategory.sub_category_name}`}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseDown={(e) => {
            // prevent accordion from toggling on mousedown in some implementations
            e.stopPropagation();
          }}
        >
          <SquarePen />
        </Button>
      }
      title="Update Sub Category Name"
      subtitle={
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span className="text-sm text-muted-foreground">Current:</span>
          <Badge className="font-semibold bg-red-100 text-red-700 border-transparent">
            {subCategory.sub_category_name}
          </Badge>
          <Badge className="font-semibold bg-red-100 text-red-700 border-transparent">
            {subCategory.code}
          </Badge>
        </div>
      }
      form={form}
      onSubmit={onSubmit}
      submitButtonText="Save"
      submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
      formId="update-subcategory-form"
    >
      <div className="space-y-4">
        <FormFieldText
          control={form.control}
          name="sub_category_name"
          label="Name"
          placeholder="Enter new category name"
        />
        <FormFieldText
          control={form.control}
          name="code"
          label="Code"
          placeholder="Enter new code"
        />
        <p className="text-xs text-muted-foreground">
          Keep names short and descriptive. This will update all linked
          types.
        </p>
      </div>
    </PopoverForm>
  );
}

export default UpdateSubCategoryForm;
