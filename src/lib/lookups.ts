// utils/lookups.ts
import {
  asset_categories,
  asset_sub_categories,
  asset_types,
  asset_conditions,
  insurances,
  status,
  employees,
  departments,
  company_id,
  urgency,
} from "@/testcases/foreignkeys";
import { asset_testcases } from "@/testcases/assets";

// Convert arrays into maps for fast lookup
const categoryMap = new Map(asset_categories.map(c => [c.category_id, c]));
const subCategoryMap = new Map(asset_sub_categories.map(sc => [sc.sub_category_id, sc]));
const typeMap = new Map(asset_types.map(t => [t.type_id, t]));
const conditionMap = new Map(asset_conditions.map(c => [c.asset_condition_id, c]));
const insuranceMap = new Map(insurances.map(i => [i.insurance_id, i]));
const statusMap = new Map(status.map(s => [s.status_id, s]));
const assetMap = new Map(asset_testcases.map(a => [a.asset_id, a]));
const employeeMap = new Map(employees.map(e => [e.employee_id, e]));
const departmentMap = new Map(departments.map(d => [d.department_id, d]));
const companyMap = new Map(company_id.map(c => [c.company_id, c]));
const urgencyMap = new Map(urgency.map(u => [u.urgency_id, u]));


// Export lookup functions
export function getCategoryName(id: number): string {
  return categoryMap.get(id)?.category_name ?? "Unknown Category";
}

export function getSubCategoryName(id: number): string {
  return subCategoryMap.get(id)?.sub_category_name ?? "Unknown Subcategory";
}

export function getTypeName(id: number): string {
  return typeMap.get(id)?.type_name ?? "Unknown Type";
}

export function getConditionName(id: number): string {
  return conditionMap.get(id)?.asset_condition_name ?? "Unknown Condition";
}

export function getInsuranceName(id: string): string {
  return insuranceMap.get(id)?.name ?? "Unknown Insurance";
}

export function getStatusName(id: number): string {
  return statusMap.get(id)?.status_name ?? "Unknown Status";
}

export function getStatus(status_id: number) {
  return statusMap.get(status_id);
}

export function getAsset(asset_id: number) {
  return assetMap.get(asset_id);
}

export function getEmployeeName(employee_id: number): string {
  return employeeMap.get(employee_id)?.employee_name ?? "Unknown Employee";
}

export function getDepartmentName(department_id: number): string {
  return departmentMap.get(department_id)?.department_name ?? "Unknown Department";
}

export function getCompanyName(company_id: number): string {
  return companyMap.get(company_id)?.company_name ?? "Unknown Company";
}

export function getUrgencyName(urgency_id: number): string {
  return urgencyMap.get(urgency_id)?.urgency_name ?? "Unknown Urgency";
}

export function getUrgency(urgency_id: number) {
  return urgencyMap.get(urgency_id);
}