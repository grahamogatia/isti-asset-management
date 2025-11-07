import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { AssetCategorySchema } from "@/data/schemas";
import type { Asset_Category } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldText from "../fields/FormFieldText";
import { Badge } from "@/components/ui/badge";
import { compareObjects } from "@/lib/utils";
import { toast } from "sonner";
import { useUpdateCategory } from "@/hooks/useCategory";

interface UpdateCategoryFormProps {
  category: Asset_Category;
}

function UpdateCategoryForm({ category }: UpdateCategoryFormProps) {
  const form = useForm<Asset_Category>({
    resolver: zodResolver(AssetCategorySchema),
    defaultValues: {
      ...category,
    },
    mode: "all",
  });

  const { mutate } = useUpdateCategory();

  function onSubmit(values: Asset_Category) {
    const changed = compareObjects(category, values);

    if (Object.values(changed).length === 0) {
      toast.info("No changes detected. Please make edits to uopdate.");
      return;
    }

    console.log(changed);

    mutate(
      {
        id: values.category_id as number,
        data: changed,
      },
      {
        onSuccess: () => {
          console.log("🎉 SUCCESS! Form submitted:", values);
          toast.success("Category successfully updated");
          form.reset(values);
        },
        onError: (error: any) => {
          console.error("Update failed:", error);
          toast.error("Failed to update category");
        },
      }
    );
  }

  return (
    <PopoverForm
      triggerButton={
        <Button
          variant="ghost"
          className="hover:bg-transparent opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 p-1"
          aria-label={`Edit ${category.category_name}`}
          title={`Edit ${category.category_name}`}
        >
          <SquarePen />
        </Button>
      }
      title="Update Category Name"
      subtitle={
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span className="text-sm text-muted-foreground">Current:</span>
          <Badge className="font-semibold bg-red-100 text-red-700 border-transparent">
            {category.category_name}
          </Badge>
        </div>
      }
      form={form}
      onSubmit={onSubmit}
      submitButtonText="Save"
      submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
      formId="update-category-name-form"
    >
      <div className="space-y-2">
        <FormFieldText
          control={form.control}
          name="category_name"
          label="Name"
          placeholder="Enter new category name"
        />
        <p className="text-xs text-muted-foreground">
          Keep names short and descriptive. This will update all linked
          subcategories.
        </p>
      </div>
    </PopoverForm>
  );
}

export default UpdateCategoryForm;
