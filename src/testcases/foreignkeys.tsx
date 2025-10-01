import type {
  Asset_Category,
  Asset_Sub_Category,
  Asset_Type,
  Company,
  Department,
  Employee,
  Insurance,
  Unit,
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

export const insurances: Insurance[] = [
  {
    insurance_id: 1,
    insurance_name: "TechGuard Insurance",
    insurance_coverage: "Comprehensive coverage for technology assets including laptops, tablets, and mobile devices",
    insurance_date_from: "2024-01-01",
    insurance_date_to: "2024-12-31"
  },
  {
    insurance_id: 2,
    insurance_name: "Corporate Asset Shield",
    insurance_coverage: "Protection against theft and accidental damage for all business equipment",
    insurance_date_from: "2024-02-15",
    insurance_date_to: "2025-02-14"
  },
  {
    insurance_id: 3,
    insurance_name: "Business Equipment Insurance",
    insurance_coverage: "Specialized coverage for office equipment and peripherals",
    insurance_date_from: "2024-03-01",
    insurance_date_to: "2025-02-28"
  },
  {
    insurance_id: 4,
    insurance_name: "SecureAsset Insurance",
    insurance_coverage: "Full coverage including replacement cost and business interruption",
    insurance_date_from: "2024-01-15",
    insurance_date_to: "2025-01-14"
  },
  {
    insurance_id: 5,
    insurance_name: "Global Tech Insurance",
    insurance_coverage: "Electronics-specific coverage for high-value technology assets",
    insurance_date_from: "2024-04-01",
    insurance_date_to: "2025-03-31"
  },
  {
    insurance_id: 6,
    insurance_name: "Enterprise Equipment Protect",
    insurance_coverage: "Combined liability and asset protection for enterprise-grade equipment",
    insurance_date_from: "2024-05-01",
    insurance_date_to: "2025-04-30"
  },
  {
    insurance_id: 7,
    insurance_name: "IT Asset Insurance",
    insurance_coverage: "Technology-specific coverage with rapid replacement services",
    insurance_date_from: "2024-06-01",
    insurance_date_to: "2025-05-31"
  },
  {
    insurance_id: 8,
    insurance_name: "Universal Business Cover",
    insurance_coverage: "All-risk coverage for business assets including natural disasters and cyber incidents",
    insurance_date_from: "2024-07-01",
    insurance_date_to: "2025-06-30"
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

export const company: Company[] = [
  {
    company_id: 1,
    company_name: "United Neon Advertising, Inc."
  },
  {
    company_id: 2,
    company_name: "Breakthrough Leadership Management Consultancy, Inc."
  },
  {
    company_id: 3,
    company_name: "InnovationOne Inc.",
  },
  {
    company_id: 4,
    company_name: "Inspire Leadership Consultancy Inc.",
  },
  {
    company_id: 8,
    company_name: "SeeWorthy International/LinkOD",
  },
  {
    company_id: 9,
    company_name: "TapAds Media Corp",
  },
  {
    company_id: 10,
    company_name: "United Neon Foundation Inc.",
  },
  {
    company_id: 11,
    company_name: "United Transit Ads System Inc.",
  },
  {
    company_id: 12,
    company_name: "Lighthouse Education Center",
  },
  {
    company_id: 13,
    company_name: "Ever Corporation",
  },
  {
    company_id: 14,
    company_name: "Gateway Bizads Inc.",
  },
];

// Fixed: Added company_id to match DepartmentSchema
export const departments: Department[] = [
  { department_id: 1, department_name: "Information Technology", company_id: 1 },
  { department_id: 2, department_name: "Human Resources", company_id: 1 },
  { department_id: 3, department_name: "Finance and Accounting", company_id: 1 },
  { department_id: 4, department_name: "Marketing and Communications", company_id: 1 },
  { department_id: 5, department_name: "Operations Management", company_id: 1 },
  { department_id: 6, department_name: "Sales and Business Development", company_id: 2 },
  { department_id: 7, department_name: "Research and Development", company_id: 2 },
  { department_id: 8, department_name: "Quality Assurance", company_id: 2 },
  { department_id: 9, department_name: "Customer Service", company_id: 3 },
  { department_id: 10, department_name: "Legal and Compliance", company_id: 3 },
  { department_id: 11, department_name: "Procurement and Supply Chain", company_id: 4 },
  { department_id: 12, department_name: "Project Management Office", company_id: 4 },
  { department_id: 13, department_name: "Training and Development", company_id: 8 },
  { department_id: 14, department_name: "Administration and Facilities", company_id: 8 },
  { department_id: 15, department_name: "Security and Risk Management", company_id: 9 },
  { department_id: 16, department_name: "Data Analytics and Business Intelligence", company_id: 9 },
  { department_id: 17, department_name: "Corporate Strategy and Planning", company_id: 10 },
  { department_id: 18, department_name: "Public Relations", company_id: 10 },
  { department_id: 19, department_name: "Internal Audit", company_id: 11 },
  { department_id: 20, department_name: "Environmental Health and Safety", company_id: 11 },
  { department_id: 21, department_name: "Innovation and Digital Transformation", company_id: 12 },
  { department_id: 22, department_name: "Executive Management", company_id: 12 },
];

// NEW: Added units array to match UnitSchema
export const units: Unit[] = [
  // IT Department Units
  { unit_id: 1, unit_name: "Software Development Team", company_id: 1, department_id: 1 },
  { unit_id: 2, unit_name: "Network Infrastructure Team", company_id: 1, department_id: 1 },
  { unit_id: 3, unit_name: "Cybersecurity Unit", company_id: 1, department_id: 1 },
  { unit_id: 4, unit_name: "Database Administration Team", company_id: 1, department_id: 1 },
  { unit_id: 5, unit_name: "Help Desk Support", company_id: 1, department_id: 1 },

  // HR Department Units
  { unit_id: 6, unit_name: "Recruitment Team", company_id: 1, department_id: 2 },
  { unit_id: 7, unit_name: "Employee Relations Unit", company_id: 1, department_id: 2 },
  { unit_id: 8, unit_name: "Payroll Administration", company_id: 1, department_id: 2 },
  { unit_id: 9, unit_name: "Training and Development Unit", company_id: 1, department_id: 2 },
  { unit_id: 10, unit_name: "Benefits Administration", company_id: 1, department_id: 2 },

  // Finance Department Units
  { unit_id: 11, unit_name: "Accounts Payable Team", company_id: 1, department_id: 3 },
  { unit_id: 12, unit_name: "Accounts Receivable Team", company_id: 1, department_id: 3 },
  { unit_id: 13, unit_name: "Financial Planning Unit", company_id: 1, department_id: 3 },
  { unit_id: 14, unit_name: "Tax Compliance Team", company_id: 1, department_id: 3 },
  { unit_id: 15, unit_name: "Budget Analysis Unit", company_id: 1, department_id: 3 },

  // Marketing Department Units
  { unit_id: 16, unit_name: "Digital Marketing Team", company_id: 1, department_id: 4 },
  { unit_id: 17, unit_name: "Content Creation Unit", company_id: 1, department_id: 4 },
  { unit_id: 18, unit_name: "Brand Management Team", company_id: 1, department_id: 4 },
  { unit_id: 19, unit_name: "Market Research Unit", company_id: 1, department_id: 4 },
  { unit_id: 20, unit_name: "Public Relations Team", company_id: 1, department_id: 4 },

  // Operations Department Units
  { unit_id: 21, unit_name: "Production Planning Team", company_id: 1, department_id: 5 },
  { unit_id: 22, unit_name: "Quality Control Unit", company_id: 1, department_id: 5 },
  { unit_id: 23, unit_name: "Logistics Coordination Team", company_id: 1, department_id: 5 },
  { unit_id: 24, unit_name: "Facilities Management Unit", company_id: 1, department_id: 5 },

  // Sales Department Units (Company 2)
  { unit_id: 25, unit_name: "Inside Sales Team", company_id: 2, department_id: 6 },
  { unit_id: 26, unit_name: "Field Sales Unit", company_id: 2, department_id: 6 },
  { unit_id: 27, unit_name: "Key Account Management", company_id: 2, department_id: 6 },
  { unit_id: 28, unit_name: "Business Development Team", company_id: 2, department_id: 6 },
  { unit_id: 29, unit_name: "Sales Operations Unit", company_id: 2, department_id: 6 },

  // R&D Department Units (Company 2)
  { unit_id: 30, unit_name: "Product Innovation Lab", company_id: 2, department_id: 7 },
  { unit_id: 31, unit_name: "Applied Research Team", company_id: 2, department_id: 7 },
  { unit_id: 32, unit_name: "Technology Development Unit", company_id: 2, department_id: 7 },
  { unit_id: 33, unit_name: "Prototype Testing Team", company_id: 2, department_id: 7 },

  // Customer Service Units (Company 3)
  { unit_id: 34, unit_name: "Customer Support Tier 1", company_id: 3, department_id: 9 },
  { unit_id: 35, unit_name: "Customer Support Tier 2", company_id: 3, department_id: 9 },
  { unit_id: 36, unit_name: "Customer Success Team", company_id: 3, department_id: 9 },
  { unit_id: 37, unit_name: "Technical Support Unit", company_id: 3, department_id: 9 },

  // Units without department assignment (company-level units)
  { unit_id: 38, unit_name: "Regional Office - North", company_id: 8 },
  { unit_id: 39, unit_name: "Regional Office - South", company_id: 8 },
  { unit_id: 40, unit_name: "Mobile Workforce Unit", company_id: 9 },
  { unit_id: 41, unit_name: "Remote Operations Team", company_id: 10 },
  { unit_id: 42, unit_name: "Field Service Unit", company_id: 11 },
  { unit_id: 43, unit_name: "Corporate Headquarters", company_id: 12 },
  { unit_id: 44, unit_name: "Branch Office - Manila", company_id: 13 },
  { unit_id: 45, unit_name: "Branch Office - Cebu", company_id: 14 },
  { unit_id: 46, unit_name: "Special Projects Division", company_id: 1 },
  { unit_id: 47, unit_name: "Innovation Hub", company_id: 2 },
  { unit_id: 48, unit_name: "Digital Transformation Office", company_id: 3 },
];

// Fixed: Updated to match EmployeeSchema (user_id, name, position, company_id, department_id, unit_id)
export const employees: Employee[] = [
  // Company 1 - IT Department
  { user_id: 1, name: "Maria Santos", position: "Senior Software Engineer", company_id: 1, department_id: 1, unit_id: 1 },
  { user_id: 2, name: "Juan Dela Cruz", position: "Network Administrator", company_id: 1, department_id: 1, unit_id: 2 },
  { user_id: 3, name: "Ana Garcia", position: "Cybersecurity Analyst", company_id: 1, department_id: 1, unit_id: 3 },
  { user_id: 4, name: "Carlos Reyes", position: "Database Administrator", company_id: 1, department_id: 1, unit_id: 4 },
  { user_id: 5, name: "Isabella Rodriguez", position: "Help Desk Technician", company_id: 1, department_id: 1, unit_id: 5 },

  // Company 1 - HR Department
  { user_id: 6, name: "Miguel Torres", position: "HR Recruiter", company_id: 1, department_id: 2, unit_id: 6 },
  { user_id: 7, name: "Sofia Morales", position: "Employee Relations Specialist", company_id: 1, department_id: 2, unit_id: 7 },
  { user_id: 8, name: "Diego Hernandez", position: "Payroll Specialist", company_id: 1, department_id: 2, unit_id: 8 },
  { user_id: 9, name: "Carmen Flores", position: "Training Coordinator", company_id: 1, department_id: 2, unit_id: 9 },
  { user_id: 10, name: "Rafael Castro", position: "Benefits Administrator", company_id: 1, department_id: 2, unit_id: 10 },

  // Company 1 - Finance Department
  { user_id: 11, name: "Lucia Mendoza", position: "Accounts Payable Clerk", company_id: 1, department_id: 3, unit_id: 11 },
  { user_id: 12, name: "Antonio Ramos", position: "Accounts Receivable Clerk", company_id: 1, department_id: 3, unit_id: 12 },
  { user_id: 13, name: "Valentina Gutierrez", position: "Financial Planner", company_id: 1, department_id: 3, unit_id: 13 },
  { user_id: 14, name: "Fernando Silva", position: "Tax Specialist", company_id: 1, department_id: 3, unit_id: 14 },
  { user_id: 15, name: "Gabriela Vargas", position: "Budget Analyst", company_id: 1, department_id: 3, unit_id: 15 },

  // Company 1 - Marketing Department
  { user_id: 16, name: "Ricardo Ortega", position: "Digital Marketing Specialist", company_id: 1, department_id: 4, unit_id: 16 },
  { user_id: 17, name: "Camila Jimenez", position: "Content Creator", company_id: 1, department_id: 4, unit_id: 17 },
  { user_id: 18, name: "Alejandro Perez", position: "Brand Manager", company_id: 1, department_id: 4, unit_id: 18 },
  { user_id: 19, name: "Natalia Aguilar", position: "Market Research Analyst", company_id: 1, department_id: 4, unit_id: 19 },
  { user_id: 20, name: "Emilio Navarro", position: "PR Specialist", company_id: 1, department_id: 4, unit_id: 20 },

  // Company 2 - Sales Department
  { user_id: 21, name: "Victoria Ruiz", position: "Inside Sales Representative", company_id: 2, department_id: 6, unit_id: 25 },
  { user_id: 22, name: "Sebastian Medina", position: "Field Sales Representative", company_id: 2, department_id: 6, unit_id: 26 },
  { user_id: 23, name: "Adriana Campos", position: "Key Account Manager", company_id: 2, department_id: 6, unit_id: 27 },
  { user_id: 24, name: "Mateo Sandoval", position: "Business Development Manager", company_id: 2, department_id: 6, unit_id: 28 },
  { user_id: 25, name: "Daniela Vega", position: "Sales Operations Coordinator", company_id: 2, department_id: 6, unit_id: 29 },

  // Company 2 - R&D Department
  { user_id: 26, name: "Leonardo Romero", position: "Innovation Lead", company_id: 2, department_id: 7, unit_id: 30 },
  { user_id: 27, name: "Valeria Guerrero", position: "Research Scientist", company_id: 2, department_id: 7, unit_id: 31 },
  { user_id: 28, name: "Nicolas Herrera", position: "Technology Developer", company_id: 2, department_id: 7, unit_id: 32 },
  { user_id: 29, name: "Mariana Cruz", position: "Prototype Tester", company_id: 2, department_id: 7, unit_id: 33 },

  // Company 3 - Customer Service
  { user_id: 30, name: "Joaquin Rivera", position: "Customer Support Representative", company_id: 3, department_id: 9, unit_id: 34 },
  { user_id: 31, name: "Regina Blanco", position: "Senior Support Specialist", company_id: 3, department_id: 9, unit_id: 35 },
  { user_id: 32, name: "Andres Fuentes", position: "Customer Success Manager", company_id: 3, department_id: 9, unit_id: 36 },
  { user_id: 33, name: "Paola Soto", position: "Technical Support Engineer", company_id: 3, department_id: 9, unit_id: 37 },

  // Employees without unit assignment (department level)
  { user_id: 34, name: "Gabriel Luna", position: "Department Manager", company_id: 1, department_id: 1 },
  { user_id: 35, name: "Esperanza Delgado", position: "HR Director", company_id: 1, department_id: 2 },
  { user_id: 36, name: "Eduardo Contreras", position: "Finance Director", company_id: 1, department_id: 3 },
  { user_id: 37, name: "Cristina Pacheco", position: "Marketing Director", company_id: 1, department_id: 4 },

  // Company-level employees (no department/unit)
  { user_id: 38, name: "Raul Espinoza", position: "CEO", company_id: 1 },
  { user_id: 39, name: "Beatriz Molina", position: "CTO", company_id: 2 },
  { user_id: 40, name: "Sergio Valdez", position: "CFO", company_id: 3 },

  // Additional employees for other companies
  { user_id: 41, name: "Alejandra Cabrera", position: "Regional Manager", company_id: 8 },
  { user_id: 42, name: "Pablo Lozano", position: "Operations Manager", company_id: 9 },
  { user_id: 43, name: "Fernanda Rojas", position: "Project Manager", company_id: 10 },
  { user_id: 44, name: "Ignacio Moreno", position: "Branch Manager", company_id: 11 },
  { user_id: 45, name: "Ximena Castillo", position: "Administrative Assistant", company_id: 12 },

  // Continue with remaining employees...
  { user_id: 46, name: "Manuel Rosales", position: "Security Officer", company_id: 13 },
  { user_id: 47, name: "Cecilia Padilla", position: "Facilities Coordinator", company_id: 14 },
  { user_id: 48, name: "Rodrigo Salazar", position: "IT Support", company_id: 1 },
  { user_id: 49, name: "Alicia Mendez", position: "Accountant", company_id: 2 },
  { user_id: 50, name: "Esteban Nunez", position: "Sales Associate", company_id: 3 },
];

export const urgency = [
  { urgency_id: 1, urgency_name: "Low" },
  { urgency_id: 2, urgency_name: "Medium" },
  { urgency_id: 3, urgency_name: "High" },
  { urgency_id: 4, urgency_name: "Critical" },
  { urgency_id: 5, urgency_name: "Emergency" },
]



