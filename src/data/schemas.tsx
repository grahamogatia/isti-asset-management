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
  warranty_due_date: z.date(),
  purchase_date: z.date(),
  notes: z.string(),
  file: z.array(z.instanceof(File)).optional(),
  insurance_id: z.number().optional(),
});

export const InsuranceSchema = z.object({
  insurance_id: z.number(),
  insurance_name: z.string(),
  insurance_coverage: z.string(),
  insurance_date_from: z.date(),
  insurance_date_to: z.date(),
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

  date_reported: z.date(), // Auto: Today
  repair_start_date: z.date(),
  repair_completion_date: z.date(),
  repair_cost: z.number(),
  remarks: z.string(),

});

export const BorrowSchema = z.object({
  asset_id: z.number(),
  category_id: z.number(),
  sub_category_id: z.number(),
  type_id: z.number(),

  user_id: z.number(),
  company_id: z.number(),
  department_id: z.number(),

  date_borrowed: z.date(),
  asset_condition_id: z.number(),
  borrow_transaction_id: z.number(),
  due_date: z.date(),
  return_date: z.date(),
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

  issuance_date: z.date(),
  pullout_date: z.date(),
  status_id: z.number(),
  remarks: z.string(),
  issuance_id: z.number(),
});

export const CompanySchema = z.object({
  company_id: z.number(),
  name: z.string(),
  alias: z.string(),
});

export const DepartmentSchema = z.object({
  department_id: z.number(),
  name: z.string(),
  alias: z.string(),
  company_id: z.number(),
});

export const UnitSchema = z.object({
  unit_id: z.number(),
  name: z.string(),
  alias: z.string().nullable(),
  company_id: z.number(),
  department_id: z.number().optional(),
});

export const EmployeeSchema = z.object({
  user_id: z.number(),
  name: z.string(),
  position: z.string(),
  company_id: z.number(),
  department_id: z.number().nullable(),
  unit_id: z.number().nullable(),
});
