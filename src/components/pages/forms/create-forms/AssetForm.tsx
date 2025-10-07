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
import { Plus } from "lucide-react";
import FormFieldTypeCombobox from "../form-fields/FormFieldTypeCombobox";
import { getIdFromDisplayName } from "@/lib/lookups";
import FormFieldInsuranceCombobox from "../form-fields/FormFieldInsuranceCombobox";

function AssetForm() {
  const form = useForm<Asset>({
    resolver: zodResolver(AssetSchema),
    defaultValues: {
      serial_number: "Test",
      category_id: undefined,
      location: "Test Location", // Changed from "undefined" string
      brand: "Test",
      specifications: "Test",
      asset_amount: 123,
      purchase_date: undefined, // Changed to empty string
      warranty_due_date: undefined, // Changed to empty string
      notes: "", // Changed to empty string
      insurance_id: 1,
      file: undefined, // Changed to null
      sub_category_id: undefined,
      type_id: undefined,
      asset_id: 1,
      asset_name: "Test",
      asset_condition_id: 1,
      status_id: 1,
      warranty_duration: 1,
    },
    mode: "all",
  });

  function onSubmit(values: Asset) {
    console.log("🎉 SUCCESS! Form submitted:", values);
  }

  const watchCategory =
    form.watch("category_id") ===
    (getIdFromDisplayName("category", "External") as number);

  return (
    <Form {...form}>
      <form
        id="asset-form"
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
          {watchCategory && (
            <FormFieldText
              control={form.control}
              name="location"
              label="Location"
              placeholder="e.g. Makati, Manila, Pasay"
            />
          )}
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
            minDate={
              form.watch("purchase_date")
                ? new Date(form.watch("purchase_date"))
                : new Date()
            }
            maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
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
            form="asset-form"
          >
            <Plus />
            Add Asset
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AssetForm;
