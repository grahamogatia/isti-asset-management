import type z from "zod";
import type {
  AssetSchema,
  InsuranceSchema,
  RepairSchema,
  BorrowSchema,
  IssuanceSchema,
  DepartmentSchema,
  CompanySchema,
  UnitSchema,
  EmployeeSchema,
  ConditionSchema,
  StatusSchema,
  AssetCategorySchema,
  AssetSubCategorySchema,
  AssetTypeSchema,
  AssetFileSchema,
} from "./schemas";

export type Asset = z.infer<typeof AssetSchema>;
export type Insurance = z.infer<typeof InsuranceSchema>;
export type Repair = z.infer<typeof RepairSchema>;
export type Borrow = z.infer<typeof BorrowSchema>;
export type Issuance = z.infer<typeof IssuanceSchema>;
export type Company = z.infer<typeof CompanySchema>;
export type Department = z.infer<typeof DepartmentSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;
export type Condition = z.infer<typeof ConditionSchema>;
export type Status = z.infer<typeof StatusSchema>;
export type Asset_Category = z.infer<typeof AssetCategorySchema>;
export type Asset_Sub_Category = z.infer<typeof AssetSubCategorySchema>;
export type Asset_Type = z.infer<typeof AssetTypeSchema>;
export type AssetFile = z.infer<typeof AssetFileSchema>;


export type Urgency = {
  urgency_id: number,
  urgency_level: string,
}

export type FunctionITAM = {
  function_id: number,
  function_name: string,
}

export type ActiveFilter = {
  id: string;
  columnName: string;
  values: string[];
  displayLabel: string;
};

export type Tab = {
  label: string;
  value: string;
}

export type AppRoutes = {
  title: string,
  url: string,
  icon: React.ElementType
}

export type Settings = {
  id: number,
  settings_key: string,
  value: string,
}