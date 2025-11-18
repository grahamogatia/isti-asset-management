import PopoverForm from "@/components/layout/PopoverForm";
import FormPopoverTrigger from "@/components/ui/form-popover-trigger";
import { AssetSchema } from "@/data/schemas";
import type { Asset } from "@/data/types";
import { useUpdateAsset } from "@/hooks/useAsset";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageOff, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import FormFieldFile from "../fields/FormFieldFile";
import { useState } from "react";

interface AddImagePopverFormProps {
  asset: Asset;
}

function AddImagePopoverForm({ asset }: AddImagePopverFormProps) {
    
  const [files, setFiles] = useState<File[]>([]);
  const { mutate } = useUpdateAsset();

  function onUploadImages(values: Asset) {
    return;
  }

  const form = useForm<Asset>({
    resolver: zodResolver(AssetSchema),
    defaultValues: {
      ...asset,
    },
    mode: "all",
  });

  return (
    <PopoverForm
      triggerButton={
        <FormPopoverTrigger icon={ImageOff} name="Add image to this asset" variant="ghost"/>
      }
      title="Add an Image?"
      subtitle={<></>}
      form={form}
      onSubmit={onUploadImages}
      submitButtonText="Upload Images"
      submitButtonIcon={<Save className="mr-2 h-4 w-4" />}
      formId="upload-images-form"
    >
      <FormFieldFile
        control={form.control}
        name="file"
        label="Images"
        placeholder="Upload images"
        files={files}
        setFiles={setFiles}
      />
    </PopoverForm>
  );
}

export default AddImagePopoverForm;
