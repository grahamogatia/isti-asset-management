import type { Asset_Category, Asset_Sub_Category } from "@/data/types";
import type { Asset } from "@/data/types";

// Note: Only "Internal" and "External" are allowed by type. "Events" is omitted for type safety.
export const asset_categories: Asset_Category[] = [
  {
    category_id: 1,
    category_name: "Internal",
  },
  {
    category_id: 2,
    category_name: "External",
  },
  { category_id: 3, category_name: "Events" as any }, // Uncomment if you extend the type
];

const subCatNames = [
  "Laptop",
  "Network",
  "Cables",
  "Ports",
  "Accessories"
];
export const asset_sub_categories: Asset_Sub_Category[] = [
  ...[1, 2].flatMap((category_id) =>
    subCatNames.map((name, i) => {
      const sub_category_id = (category_id - 1) * 5 + i + 1;
      return {
        category_id,
        category_name: (["Internal", "External"] as const)[category_id - 1],
        sub_category_id,
        sub_category_name: name,
        code: `${(["IN", "EX"])[category_id - 1]}-SC${i + 1}`,
      };
    })
  ),
];

const typeMap: Record<string, string[]> = {
  Laptop: ["Dell XPS 13", "MacBook Pro", "Lenovo ThinkPad"],
  Network: ["Cisco Switch", "TP-Link Router", "Netgear Hub"],
  Cables: ["Cat6 Cable", "HDMI Cable", "USB-C Cable"],
  Ports: ["USB Port", "Ethernet Port", "HDMI Port"],
  Accessories: ["Docking Station", "Mouse", "Keyboard"],
};

// 2 categories x 5 subcategories x 3 types x 3 assets = 90, add 10 more for 100
export const asset_testcases: Asset[] = [
  ...[1, 2].flatMap((category_id) =>
    subCatNames.map((subCat, subIdx) => {
      const sub_category_id = (category_id - 1) * 5 + subIdx + 1;
      return typeMap[subCat].flatMap((typeName, typeIdx) =>
        [0, 1, 2].map((dup) => {
          const asset_id = (category_id - 1) * 45 + subIdx * 9 + typeIdx * 3 + dup + 1;
          return {
            asset_id,
            asset_name: `${typeName} Asset ${asset_id}`,
            category_id,
            sub_category_id,
            asset_condition_id: ((asset_id % 3) + 1),
            location: `Location ${asset_id}`,
            status_id: ((asset_id % 4) + 1),
            serial_number: `SN-${asset_id.toString().padStart(4, "0")}`,
            brand: typeName.split(" ")[0],
            specifications: `Specs for asset ${asset_id}`,
            asset_amount: 1000 + (asset_id * 10),
            warranty_duration: 12 + (asset_id % 5) * 6,
            warranty_due_date: `202${6 + (asset_id % 4)}-12-31`,
            purchase_date: `202${3 + (asset_id % 3)}-0${(asset_id % 9) + 1}-15`,
            notes: `Notes for asset ${asset_id}`,
            type_id: typeIdx + 1,
            file: `asset_${asset_id}.pdf`,
            insurance_id: `INS-${asset_id.toString().padStart(3, "0")}`,
          };
        })
      );
    })
  ),
  // Add 10 more assets to reach 100
  ...Array.from({ length: 10 }, (_, i) => {
    const asset_id = 91 + i;
    return {
      asset_id,
      asset_name: `Extra Asset ${asset_id}`,
      category_id: ((i % 2) + 1),
      sub_category_id: ((i % 10) + 1),
      asset_condition_id: ((asset_id % 3) + 1),
      location: `Location ${asset_id}`,
      status_id: ((asset_id % 4) + 1),
      serial_number: `SN-${asset_id.toString().padStart(4, "0")}`,
      brand: "Generic",
      specifications: `Specs for asset ${asset_id}`,
      asset_amount: 1000 + (asset_id * 10),
      warranty_duration: 12 + (asset_id % 5) * 6,
      warranty_due_date: `202${6 + (asset_id % 4)}-12-31`,
      purchase_date: `202${3 + (asset_id % 3)}-0${(asset_id % 9) + 1}-15`,
      notes: `Notes for asset ${asset_id}`,
      type_id: ((i % 3) + 1),
      file: `asset_${asset_id}.pdf`,
      insurance_id: `INS-${asset_id.toString().padStart(3, "0")}`,
    };
  })
].flat();

