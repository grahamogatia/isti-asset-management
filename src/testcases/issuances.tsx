import type { Issuance } from "@/data/types";
import { asset_testcases } from "./assets";

export const issuance_testcases: Issuance[] = [
  {
    asset_id: asset_testcases[0].asset_id, // Dell XPS 13 Asset 1
    category_id: 1, // Internal
    user_id: 501,
    department_id: 601,
    issuance_date: 20250901,
    pullout_date: 20250915,
    status_id: 2, // Returned
    remarks: 1,
    issuance_id: 1001,
    sub_category_id: 1, // Laptop
    type_id: 1,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[3].asset_id, // MacBook Pro Asset 4
    category_id: 1, // Internal
    user_id: 502,
    department_id: 602,
    issuance_date: 20250905,
    pullout_date: 0, // Not yet pulled out
    status_id: 1, // Active
    remarks: 2,
    issuance_id: 1002,
    sub_category_id: 1, // Laptop
    type_id: 2,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[12].asset_id, // Cisco Switch Asset 13
    category_id: 1, // Internal
    user_id: 503,
    department_id: 603,
    issuance_date: 20250810,
    pullout_date: 20250825,
    status_id: 2, // Returned
    remarks: 3,
    issuance_id: 1003,
    sub_category_id: 2, // Network
    type_id: 1,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[21].asset_id, // Cat6 Cable Asset 22
    category_id: 1, // Internal
    user_id: 504,
    department_id: 601,
    issuance_date: 20250915,
    pullout_date: 0, // Not yet pulled out
    status_id: 1, // Active
    remarks: 4,
    issuance_id: 1004,
    sub_category_id: 3, // Cables
    type_id: 1,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[35].asset_id, // Docking Station Asset 36
    category_id: 1, // Internal
    user_id: 505,
    department_id: 604,
    issuance_date: 20250820,
    pullout_date: 20250905,
    status_id: 2, // Returned
    remarks: 5,
    issuance_id: 1005,
    sub_category_id: 5, // Accessories
    type_id: 1,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[46].asset_id, // Dell XPS 13 Asset 47 (External)
    category_id: 2, // External
    user_id: 506,
    department_id: 605,
    issuance_date: 20250910,
    pullout_date: 0, // Not yet pulled out
    status_id: 1, // Active
    remarks: 6,
    issuance_id: 1006,
    sub_category_id: 6, // Laptop (External)
    type_id: 1,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[58].asset_id, // TP-Link Router Asset 59 (External)
    category_id: 2, // External
    user_id: 507,
    department_id: 602,
    issuance_date: 20250825,
    pullout_date: 20250910,
    status_id: 2, // Returned
    remarks: 7,
    issuance_id: 1007,
    sub_category_id: 7, // Network (External)
    type_id: 2,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[66].asset_id, // HDMI Cable Asset 67 (External)
    category_id: 2, // External
    user_id: 508,
    department_id: 603,
    issuance_date: 20250918,
    pullout_date: 0, // Not yet pulled out
    status_id: 1, // Active
    remarks: 8,
    issuance_id: 1008,
    sub_category_id: 8, // Cables (External)
    type_id: 2,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[29].asset_id, // USB Port Asset 30
    category_id: 1, // Internal
    user_id: 509,
    department_id: 604,
    issuance_date: 20250830,
    pullout_date: 20250915,
    status_id: 2, // Returned
    remarks: 9,
    issuance_id: 1009,
    sub_category_id: 4, // Ports
    type_id: 1,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[41].asset_id, // Mouse Asset 42
    category_id: 1, // Internal
    user_id: 510,
    department_id: 605,
    issuance_date: 20250920,
    pullout_date: 0, // Not yet pulled out
    status_id: 1, // Active
    remarks: 10,
    issuance_id: 1010,
    sub_category_id: 5, // Accessories
    type_id: 2,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[6].asset_id, // Lenovo ThinkPad Asset 7
    category_id: 1, // Internal
    user_id: 511,
    department_id: 601,
    issuance_date: 20250903,
    pullout_date: 20250918,
    status_id: 2, // Returned
    remarks: 11,
    issuance_id: 1011,
    sub_category_id: 1, // Laptop
    type_id: 3,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[73].asset_id, // Keyboard Asset 74 (External)
    category_id: 2, // External
    user_id: 512,
    department_id: 602,
    issuance_date: 20250916,
    pullout_date: 0, // Not yet pulled out
    status_id: 1, // Active
    remarks: 12,
    issuance_id: 1012,
    sub_category_id: 10, // Accessories (External)
    type_id: 3,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[15].asset_id, // Netgear Hub Asset 16
    category_id: 1, // Internal
    user_id: 513,
    department_id: 603,
    issuance_date: 20250911,
    pullout_date: 20250925,
    status_id: 2, // Returned
    remarks: 13,
    issuance_id: 1013,
    sub_category_id: 2, // Network
    type_id: 3,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[88].asset_id, // Extra Asset 89
    category_id: 1, // Internal
    user_id: 514,
    department_id: 604,
    issuance_date: 20250922,
    pullout_date: 0, // Not yet pulled out
    status_id: 1, // Active
    remarks: 14,
    issuance_id: 1014,
    sub_category_id: 9, // Based on asset data
    type_id: 1,
    company_id: 1,
  },
  {
    asset_id: asset_testcases[24].asset_id, // USB-C Cable Asset 25
    category_id: 1, // Internal
    user_id: 515,
    department_id: 605,
    issuance_date: 20250828,
    pullout_date: 20250912,
    status_id: 2, // Returned
    remarks: 15,
    issuance_id: 1015,
    sub_category_id: 3, // Cables
    type_id: 3,
    company_id: 1,
  },
];

// Reference data for display purposes
export const issuance_users = {
  501: "Alex Thompson",
  502: "Betty Williams",
  503: "Charlie Brown",
  504: "Diana Martinez",
  505: "Edward Davis",
  506: "Fiona Wilson",
  507: "George Miller",
  508: "Helen Taylor",
  509: "Ivan Anderson",
  510: "Julia Garcia",
  511: "Kevin Rodriguez",
  512: "Laura Chen",
  513: "Michael Lee",
  514: "Nancy White",
  515: "Oscar Johnson",
};

export const issuance_departments = {
  601: "IT Operations",
  602: "Finance Department",
  603: "Human Resources",
  604: "Project Management",
  605: "Quality Assurance",
};

export const issuance_status = {
  1: "Active",
  2: "Returned",
  3: "Overdue",
};

export const issuance_remarks_map = {
  1: "Standard issuance for daily work",
  2: "Long-term assignment for project",
  3: "Temporary replacement equipment",
  4: "Equipment for training purposes",
  5: "Special request for remote work",
  6: "Emergency replacement issuance",
  7: "Equipment for client deployment",
  8: "Testing and evaluation purposes",
  9: "Maintenance replacement unit",
  10: "Conference and presentation use",
  11: "Field work assignment",
  12: "Home office setup equipment",
  13: "Backup equipment issuance",
  14: "New employee setup",
  15: "Equipment upgrade replacement",
};
