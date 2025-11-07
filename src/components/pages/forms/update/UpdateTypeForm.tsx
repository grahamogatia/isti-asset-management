import PopoverForm from "@/components/layout/PopoverForm";
import { Button } from "@/components/ui/button";
import { AssetTypeSchema } from "@/data/schemas";
import type { Asset_Type } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, SquarePen } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldText from "../fields/FormFieldText";
import { Badge } from "@/components/ui/badge";

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

  function onSubmit(values: Asset_Type) {}

  return (
    <PopoverForm
      triggerButton={
        <Button
          variant="ghost"
          className="hover:bg-transparent opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150 p-1"
          aria-label={`Edit ${type.type_name}`}
          title={`Edit ${type.type_name}`}
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
      title="Update Type Name"
      subtitle={
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span className="text-sm text-muted-foreground">Current:</span>
          <Badge className="font-semibold bg-red-100 text-red-700 border-transparent">
            {type.type_name}
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
