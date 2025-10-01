import { faker } from "@faker-js/faker";
import { 
  asset_types, 
  status, 
  company,
  departments,
  employees,
  urgency
} from "./foreignkeys";
import type { Repair } from "@/data/types";

faker.seed(12345);

function randomDate(startYear = 2024, endYear = 2025) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const repair_testcases = generateRepairs();

export function generateRepairs(count = 30): Repair[] {
  const repairs: Repair[] = [];

  const commonIssues = [
    "Screen flickering intermittently",
    "Keyboard keys not responding", 
    "Battery not holding charge",
    "Overheating during operation",
    "Blue screen error on startup",
    "Network connectivity issues",
    "Hard drive making clicking sounds",
    "USB ports not working",
    "Audio not functioning properly",
    "Power button stuck",
    "Cracked screen display",
    "Software crashes frequently",
    "Slow performance",
    "Fan making loud noise",
    "Memory upgrade required",
    "Virus infection detected",
    "Printer paper jam",
    "Scanner not detecting documents",
    "Projector lamp replacement needed",
    "Network cable connection loose"
  ];

  for (let i = 1; i <= count; i++) {
    // Pick random foreign key references
    const type = faker.helpers.arrayElement(asset_types);
    const sub_category_id = type.sub_category_id;
    const category_id = type.category_id;
    
    const urgencyLevel = faker.helpers.arrayElement(urgency);
    const repairStatus = faker.helpers.arrayElement(status.filter(s => 
      ["Under Repair", "Available", "Out of Service", "Maintenance"].includes(s.status_name)
    ));
    const comp = faker.helpers.arrayElement(company);
    const department = faker.helpers.arrayElement(departments);
    const employee = faker.helpers.arrayElement(employees);
    
    // Generate repair dates
    const dateReported = randomDate(2024, 2025);
    const repairStartDate = addDays(dateReported, faker.number.int({ min: 1, max: 7 })); // Start repair 1-7 days after reported
    
    // 70% chance of being completed, 30% still in progress
    const isCompleted = faker.datatype.boolean({ probability: 0.7 });
    const repairDuration = faker.number.int({ min: 1, max: 14 }); // 1-14 days to complete
    const repairCompletionDate = isCompleted 
      ? addDays(repairStartDate, repairDuration)
      : repairStartDate; // Use start date as placeholder for incomplete repairs

    const issue = faker.helpers.arrayElement(commonIssues);
    const repairCost = faker.number.int({ min: 500, max: 15000 }); // PHP 500 - 15,000

    repairs.push({
      asset_id: faker.number.int({ min: 1, max: 100 }), // Reference to assets
      category_id,
      user_id: employee.user_id,
      department_id: department.department_id,
      issue,
      urgency_id: urgencyLevel.urgency_id,
      status_id: repairStatus.status_id,
      repair_request_id: i, // Sequential repair request ID
      company_id: comp.company_id,
      sub_category_id,
      type_id: type.type_id || 0,
      remarks: faker.helpers.arrayElement([
        "Warranty repair - no cost to department",
        "Out of warranty - department charged",
        "Preventive maintenance",
        "Emergency repair required",
        "Replacement parts ordered",
        "Awaiting technical diagnosis",
        "Repair completed successfully",
        "Unable to repair - replacement needed",
        "Software issue resolved",
        "Hardware component replaced"
      ]),
      date_reported: dateReported.toISOString().split("T")[0],
      repair_start_date: repairStartDate.toISOString().split("T")[0],
      repair_completion_date: isCompleted 
        ? repairCompletionDate.toISOString().split("T")[0] 
        : "",
      repair_cost: repairCost,
    });
  }

  return repairs;
}
