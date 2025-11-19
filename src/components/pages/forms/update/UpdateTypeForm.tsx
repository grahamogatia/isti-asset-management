import PopoverForm from "@/components/layout/PopoverForm";
import { AssetTypeSchema } from "@/data/schemas";
import type { Asset_Type } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldText from "../fields/FormFieldText";
import { Badge } from "@/components/ui/badge";
import { compareObjects } from "@/lib/utils";
import { toast } from "sonner";
import { useUpdateType } from "@/hooks/useCategory";
import FormPopoverTrigger from "@/components/ui/form-popover-trigger";

interface UpdateTypeFormProps {
  type: Asset_Type;
}

function UpdateTypeForm({ type }: UpdateTypeFormProps) {
  const form = useForm<Asset_Type>({
    resolver: zodResolver(AssetTypeSchema),
    defaultValues: {
      ...type,
    },
    mode: "all",
  });

  const { mutate } = useUpdateType();

  function onSubmit(values: Asset_Type) {
    const changed = compareObjects(type, values);

    if (Object.values(changed).length === 0) {
      toast.info("No changes detected. Please make edits to uopdate.");
      return;
    }

    console.log(changed);

    mutate(
      {
        id: values.type_id as number,
        data: changed,
      },
      {
        onSuccess: () => {
          console.log("🎉 SUCCESS! Form submitted:", values);
          toast.success("Type successfully updated");
          form.reset(values);
        },
        onError: (error: any) => {
          console.error("Update failed:", error);
          toast.error("Failed to update type");
        },
      }
    );
  }

  return (
    <PopoverForm
      triggerButton={
        <FormPopoverTrigger
          icon={SquarePen}
          name="Update Type"
          variant="ghost"
        />
      }
      title="Update Type Name"
      subtitle={
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span className="text-sm text-muted-foreground">Current:</span>
          <Badge className="font-semibold bg-red-100 text-red-700 border-transparent">
            {type.type_name} {type.code}
          </Badge>
          <Badge className="font-semibold bg-red-100 text-red-700 border-transparent">
            {type.type_code}
          </Badge>
        </div>
      }
      form={form}
      onSubmit={onSubmit}
      submitButtonText="Save"
      submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
      formId="update-type-form"
    >
      <div className="space-y-4">
        <FormFieldText
          control={form.control}
          name="type_name"
          label="Name"
          placeholder="Enter new category name"
        />
        <FormFieldText
          control={form.control}
          name="type_code"
          label="Code"
          placeholder="Enter new code"
        />
        <p className="text-xs text-muted-foreground">
          Keep names short and descriptive.
        </p>
      </div>
    </PopoverForm>
  );
}

export default UpdateTypeForm;
