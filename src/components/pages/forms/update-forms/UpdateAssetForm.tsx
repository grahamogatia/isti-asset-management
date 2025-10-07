import { AssetSchema } from "@/data/schemas";
import type { Asset } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldText from "../form-fields/FormFieldText";
import { asset_types, insurances } from "@/testcases/foreignkeys";
import FormFieldTextArea from "../form-fields/FormFieldTextArea";
import FormFieldMoney from "../form-fields/FormFieldMoney";
import FormFieldDate from "../form-fields/FormFieldDate";
import FormFieldFile from "../form-fields/FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContent";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import FormFieldTypeCombobox from "../form-fields/FormFieldTypeCombobox";
import FormFieldInsuranceCombobox from "../form-fields/FormFieldInsuranceCombobox";

interface UpdateAssetFormProps {
  asset: Asset;
  onUpdate?: (updatedAsset: Asset) => void;
}

function UpdateAssetForm({ asset, onUpdate }: UpdateAssetFormProps) {
  const form = useForm<Asset>({
    resolver: zodResolver(AssetSchema),
    defaultValues: {
      ...asset,
    },
    mode: "all",
  });

  function onSubmit(values: Asset) {
    console.log("🎉 Asset updated:", values);
    onUpdate?.(values);
  }

  return (
    <Form {...form}>
      <form
        id="update-asset-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Asset Information">
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
            assetTypes={asset_types}
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
            insurances={insurances}
            form={{ ...form }}
          />
          <FormFieldFile
            control={form.control}
            name="file"
            label="Asset Document"
            placeholder="Upload asset document"
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