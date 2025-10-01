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
  company,
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
const employeeMap = new Map(employees.map(e => [e.user_id, e]));
const departmentMap = new Map(departments.map(d => [d.department_id, d]));
const companyMap = new Map(company.map(c => [c.company_id, c]));
const urgencyMap = new Map(urgency.map(u => [u.urgency_id, u]));


// Export lookup functions (ID → Name)
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

export function getInsuranceName(id: number): string {
  return insuranceMap.get(id)?.insurance_name ?? "Unknown Insurance";
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
  return employeeMap.get(employee_id)?.name ?? "Unknown Employee";
}

export function getDepartmentName(department_id: number): string {
  return departmentMap.get(department_id)?.name ?? "Unknown Department";
}

export function getCompanyName(company: number): string {
  return companyMap.get(company)?.name ?? "Unknown Company";
}

export function getUrgencyName(urgency_id: number): string {
  return urgencyMap.get(urgency_id)?.urgency_name ?? "Unknown Urgency";
}

export function getUrgency(urgency_id: number) {
  return urgencyMap.get(urgency_id);
}

export function getDisplayNameForColumn(columnName: string, id: number | string): string {
  const lookupFunctions: Record<string, (id: any) => string> = {
    'category_id': getCategoryName,
    'sub_category_id': getSubCategoryName,
    'type_id': getTypeName,
    'asset_condition_id': getConditionName,
    'insurance_id': getInsuranceName,
    'status_id': getStatusName,
    'user_id': getEmployeeName,
    'employee_id': getEmployeeName,
    'department_id': getDepartmentName,
    'company': getCompanyName,
    'urgency_id': getUrgencyName,
  };

  const lookupFunction = lookupFunctions[columnName];
  if (lookupFunction) {
    return lookupFunction(id);
  }
  
  // For non-ID columns, just return the value as string
  return String(id);
}

export function isLookupColumn(columnName: string): boolean {
  const lookupColumns = [
    'category_id',
    'sub_category_id', 
    'type_id',
    'asset_condition_id',
    'insurance_id',
    'status_id',
    'user_id',
    'employee_id',
    'department_id',
    'company',
    'urgency_id'
  ];
  
  return lookupColumns.includes(columnName);
}

export function getIdFromDisplayName(columnName: string, displayName: string): number | string | null {
  switch(columnName) {
    case "condition":
      for (const [id, condition] of conditionMap) {
        if (condition.asset_condition_name === displayName) return id;
      }
      break;
    case "status": 
      for (const [id, statusItem] of statusMap) {
        if (statusItem.status_name === displayName) return id;
      }
      break;
    case "insurance": 
      for (const [id, insurance] of insuranceMap) {
        if (insurance.insurance_name === displayName) return id;
      }
      break;
    case "category":
      for (const [id, category] of categoryMap) {
        if (category.category_name === displayName) return id;
      }
      break;
    case "department":
      for (const [id, department] of departmentMap) {
        if (department.name === displayName) return id;
      }
      break;
    case "sub_category":
      for (const [id, subCategory] of subCategoryMap) {
        if (subCategory.sub_category_name === displayName) return id;
      }
      break;
    case "type":
      for (const [id, type] of typeMap) {
        if (type.type_name === displayName) return id as number;
      }
      break;
    case "urgency":
      for (const [id, urgencyItem] of urgencyMap) {
        if (urgencyItem.urgency_name === displayName) return id;
      }
      break;
    case "company":
      for (const [id, company] of companyMap) {
        if (company.name === displayName) return id;
      }
      break;
    case "employee":
    case "user_id":
      for (const [id, employee] of employeeMap) {
        if (employee.name === displayName) return id;
      }
      break;

    default: 
      return displayName;
  }
  
  // If no match found, return null
  return null;
}