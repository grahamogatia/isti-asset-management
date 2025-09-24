import { faker } from "@faker-js/faker";
import { 
  asset_types, 
  status, 
  company_id,
  departments,
  employees
} from "./foreignkeys";
import type { Issuance } from "@/data/types";

faker.seed(12345);

function randomDate(startYear = 2024, endYear = 2025) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

function addMonths(date: Date, months: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export const issuance_testcases = generateIssuances();

export function generateIssuances(count = 40): Issuance[] {
  const issuances: Issuance[] = [];

  for (let i = 1; i <= count; i++) {
    // Pick random foreign key references
    const type = faker.helpers.arrayElement(asset_types);
    const sub_category_id = type.sub_category_id;
    const category_id = type.category_id;
    
    const issuanceStatus = faker.helpers.arrayElement(status.filter(s => 
      ["In Use", "Available", "Borrowed", "Pending Return"].includes(s.status_name)
    ));
    const company = faker.helpers.arrayElement(company_id);
    const department = faker.helpers.arrayElement(departments);
    const employee = faker.helpers.arrayElement(employees);
    
    // Generate issuance dates
    const issuanceDate = randomDate(2024, 2025);
    
    // 60% chance of being pulled out (returned), 40% still issued
    const isPulledOut = faker.datatype.boolean({ probability: 0.6 });
    
    // For issued items, pullout could be 1-12 months later
    const pulloutDate = isPulledOut 
      ? addMonths(issuanceDate, faker.number.int({ min: 1, max: 12 }))
      : issuanceDate; // Use issuance date as placeholder for active issuances

    // Convert dates to date strings (consistent with other types)
    const issuanceDateString = issuanceDate.toISOString().split("T")[0];
    const pulloutDateString = isPulledOut 
      ? pulloutDate.toISOString().split("T")[0]
      : ""; // Empty string for active issuances

    issuances.push({
      asset_id: faker.number.int({ min: 1, max: 100 }), // Reference to assets
      category_id,
      user_id: employee.employee_id,
      department_id: department.department_id,
      issuance_date: issuanceDateString,
      pullout_date: pulloutDateString,
      status_id: issuanceStatus.status_id,
      remarks: faker.helpers.arrayElement([
        "Long-term assignment to employee",
        "Project-specific equipment issuance",
        "Departmental equipment allocation",
        "Temporary assignment",
        "Permanent transfer to department",
        "Equipment for remote work",
        "Training equipment assignment",
        "Backup equipment provision",
        "Special project requirement",
        "Executive equipment assignment",
      ]),
      issuance_id: i, // Sequential issuance ID
      sub_category_id,
      type_id: type.type_id || 0,
      company_id: company.company_id,
    });
  }

  return issuances;
}
