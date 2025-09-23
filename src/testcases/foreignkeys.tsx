import type {
  Asset_Category,
  Asset_Sub_Category,
  Asset_Type,
} from "@/data/types";

export const asset_categories: Asset_Category[] = [
  {
    category_id: 1,
    category_name: "Internal",
  },
  {
    category_id: 2,
    category_name: "External",
  },
  {
    category_id: 3,
    category_name: "Events",
  },
];

export const asset_sub_categories: Asset_Sub_Category[] = [
  {
    sub_category_id: 1,
    sub_category_name: "Laptop",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "LAP",
  },
  {
    sub_category_id: 2,
    sub_category_name: "Desktop",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "DSK",
  },
  {
    sub_category_id: 3,
    sub_category_name: "Tablet",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "TAB",
  },
  {
    sub_category_id: 4,
    sub_category_name: "Mobile Phone",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "MOB",
  },
  {
    sub_category_id: 5,
    sub_category_name: "Monitor",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "MON",
  },
  {
    sub_category_id: 6,
    sub_category_name: "Printer",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "PRT",
  },
  {
    sub_category_id: 7,
    sub_category_name: "Scanner",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "SCN",
  },
  {
    sub_category_id: 8,
    sub_category_name: "Projector",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "PRJ",
  },
  {
    sub_category_id: 9,
    sub_category_name: "Network Equipment",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "NET",
  },
  {
    sub_category_id: 10,
    sub_category_name: "Server",
    category_id: 1, // Internal
    category_name: "Internal",
    code: "SRV",
  },
  {
    sub_category_id: 11,
    sub_category_name: "Security Camera",
    category_id: 2, // External
    category_name: "External",
    code: "CAM",
  },
  {
    sub_category_id: 12,
    sub_category_name: "Access Control",
    category_id: 2, // External
    category_name: "External",
    code: "ACC",
  },
  {
    sub_category_id: 13,
    sub_category_name: "Furniture",
    category_id: 2, // External
    category_name: "External",
    code: "FUR",
  },
  {
    sub_category_id: 14,
    sub_category_name: "Vehicle",
    category_id: 2, // External
    category_name: "External",
    code: "VEH",
  },
  {
    sub_category_id: 15,
    sub_category_name: "Tools & Equipment",
    category_id: 2, // External
    category_name: "External",
    code: "TLE",
  },
  {
    sub_category_id: 16,
    sub_category_name: "Event Equipment",
    category_id: 3, // Events
    category_name: "Events",
    code: "EVT",
  },
  {
    sub_category_id: 17,
    sub_category_name: "Audio Visual",
    category_id: 3, // Events
    category_name: "Events",
    code: "AV",
  },
  {
    sub_category_id: 18,
    sub_category_name: "Lighting",
    category_id: 3, // Events
    category_name: "Events",
    code: "LGT",
  },
];

export const asset_types: Asset_Type[] = [
  // Laptop Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 1,
    sub_category_name: "Laptop",
    code: "LAP",
    type_id: 1,
    type_name: "Business Laptop",
    type_code: 101,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 1,
    sub_category_name: "Laptop",
    code: "LAP",
    type_id: 2,
    type_name: "Gaming Laptop",
    type_code: 102,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 1,
    sub_category_name: "Laptop",
    code: "LAP",
    type_id: 3,
    type_name: "Ultrabook",
    type_code: 103,
  },
  // Desktop Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 2,
    sub_category_name: "Desktop",
    code: "DSK",
    type_id: 4,
    type_name: "Workstation",
    type_code: 201,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 2,
    sub_category_name: "Desktop",
    code: "DSK",
    type_id: 5,
    type_name: "Mini PC",
    type_code: 202,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 2,
    sub_category_name: "Desktop",
    code: "DSK",
    type_id: 6,
    type_name: "All-in-One PC",
    type_code: 203,
  },
  // Tablet Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 3,
    sub_category_name: "Tablet",
    code: "TAB",
    type_id: 7,
    type_name: "iPad",
    type_code: 301,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 3,
    sub_category_name: "Tablet",
    code: "TAB",
    type_id: 8,
    type_name: "Android Tablet",
    type_code: 302,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 3,
    sub_category_name: "Tablet",
    code: "TAB",
    type_id: 9,
    type_name: "Surface Tablet",
    type_code: 303,
  },
  // Mobile Phone Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 4,
    sub_category_name: "Mobile Phone",
    code: "MOB",
    type_id: 10,
    type_name: "iPhone",
    type_code: 401,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 4,
    sub_category_name: "Mobile Phone",
    code: "MOB",
    type_id: 11,
    type_name: "Android Phone",
    type_code: 402,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 4,
    sub_category_name: "Mobile Phone",
    code: "MOB",
    type_id: 12,
    type_name: "Feature Phone",
    type_code: 403,
  },
  // Monitor Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 5,
    sub_category_name: "Monitor",
    code: "MON",
    type_id: 13,
    type_name: "LED Monitor",
    type_code: 501,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 5,
    sub_category_name: "Monitor",
    code: "MON",
    type_id: 14,
    type_name: "OLED Monitor",
    type_code: 502,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 5,
    sub_category_name: "Monitor",
    code: "MON",
    type_id: 15,
    type_name: "4K Monitor",
    type_code: 503,
  },
  // Printer Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 6,
    sub_category_name: "Printer",
    code: "PRT",
    type_id: 16,
    type_name: "Laser Printer",
    type_code: 601,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 6,
    sub_category_name: "Printer",
    code: "PRT",
    type_id: 17,
    type_name: "Inkjet Printer",
    type_code: 602,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 6,
    sub_category_name: "Printer",
    code: "PRT",
    type_id: 18,
    type_name: "3D Printer",
    type_code: 603,
  },
  // Network Equipment Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 9,
    sub_category_name: "Network Equipment",
    code: "NET",
    type_id: 19,
    type_name: "Router",
    type_code: 901,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 9,
    sub_category_name: "Network Equipment",
    code: "NET",
    type_id: 20,
    type_name: "Switch",
    type_code: 902,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 9,
    sub_category_name: "Network Equipment",
    code: "NET",
    type_id: 21,
    type_name: "Access Point",
    type_code: 903,
  },
  // Server Types
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 10,
    sub_category_name: "Server",
    code: "SRV",
    type_id: 22,
    type_name: "Rack Server",
    type_code: 1001,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 10,
    sub_category_name: "Server",
    code: "SRV",
    type_id: 23,
    type_name: "Blade Server",
    type_code: 1002,
  },
  {
    category_id: 1,
    category_name: "Internal",
    sub_category_id: 10,
    sub_category_name: "Server",
    code: "SRV",
    type_id: 24,
    type_name: "Tower Server",
    type_code: 1003,
  },
  // Security Camera Types
  {
    category_id: 2,
    category_name: "External",
    sub_category_id: 11,
    sub_category_name: "Security Camera",
    code: "CAM",
    type_id: 25,
    type_name: "IP Camera",
    type_code: 1101,
  },
  {
    category_id: 2,
    category_name: "External",
    sub_category_id: 11,
    sub_category_name: "Security Camera",
    code: "CAM",
    type_id: 26,
    type_name: "PTZ Camera",
    type_code: 1102,
  },
  {
    category_id: 2,
    category_name: "External",
    sub_category_id: 11,
    sub_category_name: "Security Camera",
    code: "CAM",
    type_id: 27,
    type_name: "Dome Camera",
    type_code: 1103,
  },
  // Vehicle Types
  {
    category_id: 2,
    category_name: "External",
    sub_category_id: 14,
    sub_category_name: "Vehicle",
    code: "VEH",
    type_id: 28,
    type_name: "Company Car",
    type_code: 1401,
  },
  {
    category_id: 2,
    category_name: "External",
    sub_category_id: 14,
    sub_category_name: "Vehicle",
    code: "VEH",
    type_id: 29,
    type_name: "Van",
    type_code: 1402,
  },
  {
    category_id: 2,
    category_name: "External",
    sub_category_id: 14,
    sub_category_name: "Vehicle",
    code: "VEH",
    type_id: 30,
    type_name: "Motorcycle",
    type_code: 1403,
  },
  // Event Equipment Types
  {
    category_id: 3,
    category_name: "Events",
    sub_category_id: 16,
    sub_category_name: "Event Equipment",
    code: "EVT",
    type_id: 31,
    type_name: "Stage Platform",
    type_code: 1601,
  },
  {
    category_id: 3,
    category_name: "Events",
    sub_category_id: 16,
    sub_category_name: "Event Equipment",
    code: "EVT",
    type_id: 32,
    type_name: "Tent",
    type_code: 1602,
  },
  // Audio Visual Types
  {
    category_id: 3,
    category_name: "Events",
    sub_category_id: 17,
    sub_category_name: "Audio Visual",
    code: "AV",
    type_id: 33,
    type_name: "Projector",
    type_code: 1701,
  },
  {
    category_id: 3,
    category_name: "Events",
    sub_category_id: 17,
    sub_category_name: "Audio Visual",
    code: "AV",
    type_id: 34,
    type_name: "PA System",
    type_code: 1702,
  },
  // Lighting Types
  {
    category_id: 3,
    category_name: "Events",
    sub_category_id: 18,
    sub_category_name: "Lighting",
    code: "LGT",
    type_id: 35,
    type_name: "LED Lighting Rig",
    type_code: 1801,
  },
  {
    category_id: 3,
    category_name: "Events",
    sub_category_id: 18,
    sub_category_name: "Lighting",
    code: "LGT",
    type_id: 36,
    type_name: "Spotlight",
    type_code: 1802,
  },
];

export const asset_conditions = [
  { asset_condition_id: 1, asset_condition_name: "Excellent" },
  { asset_condition_id: 2, asset_condition_name: "Good" },
  { asset_condition_id: 3, asset_condition_name: "Fair" },
  { asset_condition_id: 4, asset_condition_name: "Poor" },
  { asset_condition_id: 5, asset_condition_name: "Needs Repair" },
  { asset_condition_id: 6, asset_condition_name: "Out of Service" },
  { asset_condition_id: 7, asset_condition_name: "Under Maintenance" },
  { asset_condition_id: 8, asset_condition_name: "Damaged" },
];

export const insurances = [
  {
    insurance_id: "INS-2024-001",
    name: "TechGuard Insurance",
    description:
      "Comprehensive coverage for technology assets including laptops, tablets, and mobile devices",
    coverage: 50000,
  },
  {
    insurance_id: "INS-2024-002",
    name: "Corporate Asset Shield",
    description:
      "Protection against theft and accidental damage for all business equipment",
    coverage: 75000,
  },
  {
    insurance_id: "INS-2024-003",
    name: "Business Equipment Insurance",
    description: "Specialized coverage for office equipment and peripherals",
    coverage: 30000,
  },
  {
    insurance_id: "INS-2023-004",
    name: "SecureAsset Insurance",
    description:
      "Full coverage including replacement cost and business interruption",
    coverage: 100000,
  },
  {
    insurance_id: "INS-2024-005",
    name: "Global Tech Insurance",
    description:
      "Electronics-specific coverage for high-value technology assets",
    coverage: 60000,
  },
  {
    insurance_id: "INS-2024-006",
    name: "Enterprise Equipment Protect",
    description:
      "Combined liability and asset protection for enterprise-grade equipment",
    coverage: 80000,
  },
  {
    insurance_id: "INS-2024-007",
    name: "IT Asset Insurance",
    description: "Technology-specific coverage with rapid replacement services",
    coverage: 45000,
  },
  {
    insurance_id: "INS-2024-008",
    name: "Universal Business Cover",
    description:
      "All-risk coverage for business assets including natural disasters and cyber incidents",
    coverage: 90000,
  },
];

export const status = [
  {
    status_id: 1,
    status_name: "Available",
  },
  {
    status_id: 2,
    status_name: "In Use",
  },
  {
    status_id: 3,
    status_name: "Under Repair",
  },
  {
    status_id: 4,
    status_name: "Out of Service",
  },
  {
    status_id: 5,
    status_name: "Borrowed",
  },
  {
    status_id: 6,
    status_name: "Reserved",
  },
  {
    status_id: 7,
    status_name: "Pending Return",
  },
  {
    status_id: 8,
    status_name: "Maintenance",
  },
  {
    status_id: 9,
    status_name: "Disposed",
  },
  {
    status_id: 10,
    status_name: "Lost",
  },
  {
    status_id: 11,
    status_name: "Stolen",
  },
  {
    status_id: 12,
    status_name: "Retired",
  },
];
