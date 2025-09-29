import { AssetSchema } from "@/data/schemas";
import type { Asset } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";

import FormFieldText from "./FormFieldText";
import FormFieldSelect from "./FormFieldSelect";
import { asset_categories, insurances } from "@/testcases/foreignkeys";
import FormFieldTextArea from "./FormFieldTextArea";
import FormFieldMoney from "./FormFieldMoney";
import FormFieldDate from "./FormFieldDate";
import FormFieldFile from "./FormFieldFile";
import FormCardContent from "@/components/layout/FormCardContainer";

function AssetForm() {
  const form = useForm<Asset>({
    resolver: zodResolver(AssetSchema),
    defaultValues: {
      serial_number: undefined,
      category_id: undefined,
      location: undefined,
      brand: undefined,
      specifications: undefined,
      asset_amount: undefined,
      purchase_date: undefined,
      warranty_due_date: undefined,
      notes: undefined,
      insurance_id: undefined,
      file: undefined,
      sub_category_id: undefined,
      type_id: undefined,
    },
  });

  function onSubmit(values: z.infer<Asset>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
          <FormFieldSelect
            control={form.control}
            name="category_id"
            label="Category"
            placeholder="Select the asset category"
          >
            {asset_categories.map((category) => {
              return (
                <SelectItem value={String(category.category_id)}>
                  {category.category_name}
                </SelectItem>
              );
            })}
          </FormFieldSelect>
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
          <FormFieldSelect
            control={form.control}
            name="insurance_id"
            label="Insurance"
            placeholder="Enter insurance"
          >
            {insurances.map((insurance) => {
              return (
                <SelectItem value={insurance.insurance_id}>
                  {insurance.name}
                </SelectItem>
              );
            })}
          </FormFieldSelect>
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
      </form>
    </Form>
  );
}

export default AssetForm;
