// utils/lookups.ts
import {
  asset_categories,
  asset_sub_categories,
  asset_types,
  asset_conditions,
  insurances,
  status,
} from "@/testcases/foreignkeys";

// Convert arrays into maps for fast lookup
const categoryMap = new Map(asset_categories.map(c => [c.category_id, c]));
const subCategoryMap = new Map(asset_sub_categories.map(sc => [sc.sub_category_id, sc]));
const typeMap = new Map(asset_types.map(t => [t.type_id, t]));
const conditionMap = new Map(asset_conditions.map(c => [c.asset_condition_id, c]));
const insuranceMap = new Map(insurances.map(i => [i.insurance_id, i]));
const statusMap = new Map(status.map(s => [s.status_id, s]));

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
