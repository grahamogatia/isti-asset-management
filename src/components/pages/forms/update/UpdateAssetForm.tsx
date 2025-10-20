import { AssetSchema } from "@/data/schemas";
import type { Asset } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../fields/FormFieldText";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldMoney from "../fields/FormFieldMoney";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldFile from "../fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import FormFieldTypeCombobox from "../fields/FormFieldTypeCombobox";
import FormFieldInsuranceCombobox from "../fields/FormFieldInsuranceCombobox";
import DisplayField from "@/components/layout/DisplayField";
import DisplayAsset from "@/components/ui/display-asset";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useTypes } from "@/hooks/useCategory";
import { useInsurances } from "@/hooks/useInsurance";
import { compareObjects } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { useUpdateRepair } from "@/hooks/useRepair";

interface UpdateAssetFormProps {
  asset: Asset;
}

function UpdateAssetForm({ asset }: UpdateAssetFormProps) {
  const form = useForm<Asset>({
    resolver: zodResolver(AssetSchema),
    defaultValues: {
      ...asset,
    },
    mode: "all",
  });

  const { mutate } = useUpdateRepair();
  const { data: asset_types } = useTypes();
  const { data: insurances } = useInsurances();
  const { getCategoryName, getSubCategoryName, getTypeName } =
    useLookupFunctions();
  const [files, setFiles] = useState<File[]>([]);
  

  function onSubmit(values: Asset) {
    const changed = compareObjects(asset, values);

    if (Object.values(changed).length === 0) {
      toast.info("No changes detected. Please make edits to update.");
      return;
    }

    mutate({
      id: values.asset_id as number,
      data: changed,
    });
    console.log("🎉 Asset updated:", values);
  }

  return (
    <Form {...form}>
      <form
        id="update-asset-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Asset Information">
          <DisplayField name="asset_name" label="Asset Name">
            <DisplayAsset
              asset_name={asset?.asset_name as string}
              category={getCategoryName(asset?.category_id as number)}
              sub_category={getSubCategoryName(
                asset?.sub_category_id as number
              )}
              type={getTypeName(asset?.type_id as number)}
            />
          </DisplayField>
          <FormFieldText
            control={form.control}
            name="serial_number"
            label="Serial Number"
            placeholder="e.g. ABC123456789"
          />
          <FormFieldText
            control={form.control}
            name="brand"
            label="Brand"
            placeholder="e.g. Dell, HP, Apple"
          />
          <FormFieldTypeCombobox
            control={form.control}
            name="type_id"
            label="Type"
            assetTypes={asset_types ?? []}
            form={{ ...form }}
          />
          <FormFieldText
            control={form.control}
            name="location"
            label="Location"
            placeholder="e.g. Makati, Manila, Pasay"
          />
          <FormFieldTextArea
            control={form.control}
            name="specifications"
            label="Specifications"
            placeholder="e.g. Intel i7 processor, 16GB RAM, 512GB SSD..."
          />
        </FormCardContent>

        <FormCardContent title="Asset Details">
          <FormFieldMoney
            control={form.control}
            name="asset_amount"
            label="Amount"
            placeholder="0.00"
          />
          <FormFieldDate
            control={form.control}
            name="purchase_date"
            label="Purchase Date"
            placeholder="Select purchase date"
          />
          <FormFieldDate
            control={form.control}
            name="warranty_due_date"
            label="Warranty Due Date"
            placeholder="Select warranty expiry date"
          />
        </FormCardContent>

        <FormCardContent title="Additional Information">
          <FormFieldInsuranceCombobox
            control={form.control}
            name="insurance_id"
            label="Insurance"
            insurances={insurances ?? []}
            form={{ ...form }}
          />
          <FormFieldFile
            control={form.control}
            name="file"
            label="Asset Document"
            placeholder="Upload asset document"
            files={files}
            setFiles={setFiles}
          />
          <FormFieldTextArea
            control={form.control}
            name="notes"
            label="Notes"
            placeholder="Enter notes"
          />
        </FormCardContent>

        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-md"
            type="submit"
            form="update-asset-form"
            onClick={() =>
              console.log(asset)
            }
          >
            <Save className="mr-2 h-4 w-4" />
            Update Asset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateAssetForm;
