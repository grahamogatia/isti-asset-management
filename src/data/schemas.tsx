import { z } from "zod";

// Pool FK IDs from existing tables
export const AssetSchema = z.object({
  asset_id: z.number(),
  asset_name: z.string(),
  category_id: z.number(), // Pool from existing category IDs
  sub_category_id: z.number(),
  type_id: z.number().optional(),
  asset_condition_id: z.number(),
  location: z.string().optional(),
  status_id: z.number(),
  serial_number: z.string(),
  brand: z.string(),
  specifications: z.string(),
  asset_amount: z.number(),
  warranty_duration: z.number(),
  warranty_due_date: z.string(),
  purchase_date: z.string(),
  notes: z.string(),
  file: z.file().nullable(),
  insurance_id: z.number().optional(),
});
