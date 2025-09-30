import { z } from "zod";

// Pool FK IDs from existing tables
export const AssetSchema = z.object({
  asset_id: z.number().optional(),
  asset_name: z.string().optional(),
  category_id: z.number(), // Pool from existing category IDs
  sub_category_id: z.number().optional(),
  type_id: z.number(),
  asset_condition_id: z.number().optional(),
  location: z.string().optional(),
  status_id: z.number().optional(),
  serial_number: z.string(),
  brand: z.string(),
  specifications: z.string(),
  asset_amount: z.number(),
  warranty_duration: z.number().optional(),
  warranty_due_date: z.string(),
  purchase_date: z.string(),
  notes: z.string(),
  file: z.instanceof(File).nullable(),
  insurance_id: z.number().optional(),
});
