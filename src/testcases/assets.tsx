import { faker } from "@faker-js/faker";
import { asset_conditions, asset_types, insurances, status } from "./foreignkeys";
import type { Asset } from "@/data/types";

faker.seed(12345);

function randomDate(startYear = 2019, endYear = 2024) {
  const start = new Date(startYear, 0, 1).getTime();
  const end = new Date(endYear, 11, 31).getTime();
  return new Date(start + Math.random() * (end - start));
}

export const asset_testcases = generateAssets();

export function generateAssets(count = 100): Asset[] {
  const assets: Asset[] = [];

  for (let i = 1; i <= count; i++) {
    // pick a random type
    const type = faker.helpers.arrayElement(asset_types);
    const sub_category_id = type.sub_category_id;
    const category_id = type.category_id;

    const condition = faker.helpers.arrayElement(asset_conditions);
    const stat = faker.helpers.arrayElement(status);
    const insurance = faker.helpers.arrayElement(insurances);

    const purchase_date = randomDate();
    const warrantyMonths = faker.helpers.arrayElement([12, 24, 36, 48]);
    const warrantyDue = new Date(purchase_date);
    warrantyDue.setMonth(warrantyDue.getMonth() + warrantyMonths);

    assets.push({
      asset_id: i,
      asset_name: `${faker.company.name()} ${type.type_name} ${i}`,
      category_id,
      sub_category_id,
      type_id: type.type_id,
      asset_condition_id: condition.asset_condition_id,
      location: faker.location.city(),
      status_id: stat.status_id,
      serial_number: `${type.code}-${String(i).padStart(4, "0")}`,
      brand: faker.company.name(),
      specifications: faker.commerce.productDescription(),
      asset_amount: faker.number.int({ min: 10000, max: 200000 }),
      warranty_duration: warrantyMonths,
      warranty_due_date: warrantyDue.toISOString().split("T")[0],
      purchase_date: purchase_date.toISOString().split("T")[0],
      notes: faker.lorem.sentence(),
      file: `${type.code}_${i}.pdf`,
      insurance_id: insurance.insurance_id,
    });
  }

  return assets;
}
