// utils/lookups.ts
import {
  asset_conditions,
  insurances,
  status,
  employees,
  departments,
  company,
  urgency,
  units,
} from "@/testcases/foreignkeys";
import { asset_testcases } from "@/testcases/assets";


// Convert arrays into maps for fast lookup

const conditionMap = new Map(
  asset_conditions.map((c) => [c.asset_condition_id, c])
);
const insuranceMap = new Map(insurances.map((i) => [i.insurance_id, i]));
const statusMap = new Map(status.map((s) => [s.status_id, s]));
const assetMap = new Map(asset_testcases.map((a) => [a.asset_id, a]));
const employeeMap = new Map(employees.map((e) => [e.user_id, e]));
const departmentMap = new Map(departments.map((d) => [d.department_id, d]));
const unitMap = new Map(units.map((u) => [u.unit_id, u]));
const companyMap = new Map(company.map((c) => [c.company_id, c]));
const urgencyMap = new Map(urgency.map((u) => [u.urgency_id, u]));

// Export lookup functions (ID → Name)


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

export function getUnitName(unit_id: number): string {
  return unitMap.get(unit_id)?.name ?? "Unknown Unit";
}

export function getUrgencyName(urgency_id: number): string {
  return urgencyMap.get(urgency_id)?.urgency_name ?? "Unknown Urgency";
}

export function getUrgency(urgency_id: number) {
  return urgencyMap.get(urgency_id);
