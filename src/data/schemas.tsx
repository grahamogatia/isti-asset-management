import { z } from "zod";

// Pool FK IDs from existing tables
export const AssetSchema = z.object({
  asset_id: z.number().optional(),
  asset_name: z.string().optional(),
  category_id: z.number(), // Pool from existing category IDs
  sub_category_id: z.number(),
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
  file: z.any().optional(),
  insurance_id: z.number().optional(),
});

export const InsuranceSchema = z.object({
  insurance_id: z.number(),
  insurance_name: z.string(),
  insurance_coverage: z.string(),
  insurance_date_from: z.string(),
  insurance_date_to: z.string(),
});

export const RepairSchema = z.object({
  asset_id: z.number(),
  category_id: z.number(),
  sub_category_id: z.number(),
  type_id: z.number(),

  user_id: z.number(),
  company_id: z.number(),
  department_id: z.number(),

  issue: z.string(),
  urgency_id: z.number(),
  status_id: z.number(),
  repair_request_id: z.number(),
  remarks: z.string(),
  date_reported: z.string(),
  repair_start_date: z.string(),
  repair_completion_date: z.string(),
  repair_cost: z.number(),
});

export const BorrowSchema = z.object({
  asset_id: z.number(),
  category_id: z.number(),
  sub_category_id: z.number(),
  type_id: z.number(),

  user_id: z.number(),
  company_id: z.number(),
  department_id: z.number(),

  date_borrowed: z.string(),
  asset_condition_id: z.number(),
  borrow_transaction_id: z.number(),
  due_date: z.string(),
  return_date: z.string(),
  duration: z.number(),
  remarks: z.string(),
});

export const IssuanceSchema = z.object({
  asset_id: z.number(),
  sub_category_id: z.number(),
  type_id: z.number(),
  category_id: z.number(),

  user_id: z.number(),
  company_id: z.number(),
  department_id: z.number(),

  issuance_date: z.string(),
  pullout_date: z.string(),
  status_id: z.number(),
  remarks: z.string(),
  issuance_id: z.number(),
});
