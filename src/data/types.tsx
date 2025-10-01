import type z from "zod";
import type { AssetSchema, InsuranceSchema, RepairSchema, BorrowSchema, IssuanceSchema, DepartmentSchema, CompanySchema, UnitSchema, EmployeeSchema } from "./schemas";

export type Asset_Category = {
  category_id: number;
  category_name: "Internal" | "External" | "Events";
};

export interface Asset_Sub_Category extends Asset_Category {
  sub_category_id: number;
  sub_category_name: string;
  code: string;
}

export interface Asset_Type extends Asset_Sub_Category {
  type_id: number;
  type_name: string;
  type_code: number;
}

export type Asset = z.infer<typeof AssetSchema>;
export type Insurance = z.infer<typeof InsuranceSchema>;
export type Repair = z.infer<typeof RepairSchema>;
export type Borrow = z.infer<typeof BorrowSchema>;
export type Issuance = z.infer<typeof IssuanceSchema>;

export type Company = z.infer<typeof CompanySchema>;
export type Department = z.infer<typeof DepartmentSchema>;
export type Unit = z.infer<typeof UnitSchema>;
export type Employee = z.infer<typeof EmployeeSchema>;

export type ActiveFilter = {
  id: string;
  columnName: string;
  values: string[];
  displayLabel: string;
}