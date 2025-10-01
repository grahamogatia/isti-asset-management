import { faker } from "@faker-js/faker";
import { 
  asset_conditions, 
  asset_types, 
  company,
  departments,
  employees 
} from "./foreignkeys";
import type { Borrow, Company, Department, Employee } from "@/data/types";

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

export const borrow_testcases = generateBorrows();

export function generateBorrows(count = 50): Borrow[] {
  const borrows: Borrow[] = [];

  for (let i = 1; i <= count; i++) {
    // Pick random foreign key references
    const type = faker.helpers.arrayElement(asset_types);
    const sub_category_id = type.sub_category_id;
    const category_id = type.category_id;
    
    const condition = faker.helpers.arrayElement(asset_conditions);
    const comp: Company = faker.helpers.arrayElement(company); // Fixed: renamed variable
    const department: Department = faker.helpers.arrayElement(departments);
    const employee: Employee = faker.helpers.arrayElement(employees);
    
    // Generate borrow dates
    const dateBorrowed = randomDate();
    const duration = faker.helpers.arrayElement([7, 14, 30, 60, 90]); // Duration in days
    const dueDate = addDays(dateBorrowed, duration);
    
    // 70% chance of being returned, 30% still borrowed
    const isReturned = faker.datatype.boolean({ probability: 0.7 });
    const returnDate = isReturned 
      ? addDays(dateBorrowed, faker.number.int({ min: 1, max: duration + 5 }))
      : null; // Fixed: use null for unreturned items

    borrows.push({
      asset_id: faker.number.int({ min: 1, max: 100 }),
      category_id,
      user_id: employee.user_id,
      department_id: department.department_id,
      date_borrowed: dateBorrowed.toISOString().split("T")[0],
      asset_condition_id: condition.asset_condition_id,
      borrow_transaction_id: i,
      company_id: comp.company_id, // Fixed: use comp instead of company
      sub_category_id,
      type_id: type.type_id || 0,
      due_date: dueDate.toISOString().split("T")[0],
      return_date: isReturned ? returnDate!.toISOString().split("T")[0] : "",
      duration,
      remarks: faker.helpers.arrayElement([
        "Equipment for project work",
        "Temporary assignment",
        "Field work requirement",
        "Training purposes",
        "Backup equipment needed",
        "Remote work setup",
        "Conference presentation",
        "Client meeting",
        "System testing",
        "Emergency replacement"
      ]),
    });
  }

  return borrows;
}