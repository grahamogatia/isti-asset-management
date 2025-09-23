import type { Repair } from "@/data/types";
import { asset_testcases } from "./assets";

export const repair_testcases: Repair[] = [
  {
    asset_id: asset_testcases[0].asset_id, // Dell XPS 13 Asset 1
    category_id: 1, // Internal
    user_id: 201,
    department_id: 301,
    issue: "Laptop screen flickering and display distortion",
    urgency_id: 2, // High
    status_id: 1, // In Progress
    repair_request_id: 5001,
    company_id: 1,
    sub_category_id: 1, // Laptop
    type_id: 1,
    remarks: "Screen replacement required. Waiting for parts delivery.",
    date_reported: "2025-09-15",
    repair_start_date: "2025-09-16",
    repair_completion_date: "",
    repair_cost: 450.00
  },
  {
    asset_id: asset_testcases[12].asset_id, // Cisco Switch Asset 13
    category_id: 1, // Internal
    user_id: 205,
    department_id: 302,
    issue: "Network switch not responding to ping commands",
    urgency_id: 3, // Critical
    status_id: 2, // Completed
    repair_request_id: 5002,
    company_id: 1,
    sub_category_id: 2, // Network
    type_id: 1,
    remarks: "Firmware corrupted. Successfully updated to latest version.",
    date_reported: "2025-09-10",
    repair_start_date: "2025-09-10",
    repair_completion_date: "2025-09-11",
    repair_cost: 0.00
  },
  {
    asset_id: asset_testcases[46].asset_id, // Dell XPS 13 Asset 47 (External)
    category_id: 2, // External
    user_id: 203,
    department_id: 303,
    issue: "Laptop overheating and random shutdowns",
    urgency_id: 2, // High
    status_id: 1, // In Progress
    repair_request_id: 5003,
    company_id: 1,
    sub_category_id: 6, // Laptop (External)
    type_id: 1,
    remarks: "Thermal paste replacement and fan cleaning in progress.",
    date_reported: "2025-09-18",
    repair_start_date: "2025-09-19",
    repair_completion_date: "",
    repair_cost: 120.00
  },
  {
    asset_id: asset_testcases[67].asset_id, // Docking Station Asset 68 (External)
    category_id: 2, // External
    user_id: 208,
    department_id: 301,
    issue: "Docking station not detecting external monitors",
    urgency_id: 1, // Low
    status_id: 3, // Pending
    repair_request_id: 5004,
    company_id: 1,
    sub_category_id: 10, // Accessories (External)
    type_id: 1,
    remarks: "Scheduled for diagnostics next week. Driver update may be needed.",
    date_reported: "2025-09-20",
    repair_start_date: "",
    repair_completion_date: "",
    repair_cost: 85.00
  },
  {
    asset_id: asset_testcases[58].asset_id, // TP-Link Router Asset 59 (External)
    category_id: 2, // External
    user_id: 212,
    department_id: 304,
    issue: "Router intermittent connectivity and slow speeds",
    urgency_id: 2, // High
    status_id: 2, // Completed
    repair_request_id: 5005,
    company_id: 1,
    sub_category_id: 7, // Network (External)
    type_id: 2,
    remarks: "Configuration reset and antenna replacement completed successfully.",
    date_reported: "2025-09-12",
    repair_start_date: "2025-09-13",
    repair_completion_date: "2025-09-14",
    repair_cost: 75.00
  },
  {
    asset_id: asset_testcases[3].asset_id, // MacBook Pro Asset 4
    category_id: 1, // Internal
    user_id: 206,
    department_id: 302,
    issue: "Laptop keyboard keys not responding",
    urgency_id: 2, // High
    status_id: 1, // In Progress
    repair_request_id: 5006,
    company_id: 1,
    sub_category_id: 1, // Laptop
    type_id: 2,
    remarks: "Keyboard replacement in progress. Expected completion tomorrow.",
    date_reported: "2025-09-21",
    repair_start_date: "2025-09-22",
    repair_completion_date: "",
    repair_cost: 95.00
  },
  {
    asset_id: asset_testcases[21].asset_id, // Cat6 Cable Asset 22
    category_id: 1, // Internal
    user_id: 210,
    department_id: 305,
    issue: "Network cable showing intermittent connection",
    urgency_id: 1, // Low
    status_id: 2, // Completed
    repair_request_id: 5007,
    company_id: 1,
    sub_category_id: 3, // Cables
    type_id: 1,
    remarks: "Cable tested and replaced. Connection now stable.",
    date_reported: "2025-09-08",
    repair_start_date: "2025-09-09",
    repair_completion_date: "2025-09-09",
    repair_cost: 15.00
  },
  {
    asset_id: asset_testcases[91].asset_id, // Extra Asset 92
    category_id: 2, // External
    user_id: 215,
    department_id: 306,
    issue: "Asset experiencing overheating and performance issues",
    urgency_id: 3, // Critical
    status_id: 1, // In Progress
    repair_request_id: 5008,
    company_id: 1,
    sub_category_id: 2, // Based on asset data
    type_id: 2,
    remarks: "Thermal management system repair underway.",
    date_reported: "2025-09-23",
    repair_start_date: "2025-09-23",
    repair_completion_date: "",
    repair_cost: 200.00
  },
  {
    asset_id: asset_testcases[5].asset_id, // Lenovo ThinkPad Asset 6
    category_id: 1, // Internal
    user_id: 204,
    department_id: 301,
    issue: "Laptop battery not charging and draining quickly",
    urgency_id: 2, // High
    status_id: 3, // Pending
    repair_request_id: 5009,
    company_id: 1,
    sub_category_id: 1, // Laptop
    type_id: 3,
    remarks: "Battery replacement ordered. Waiting for delivery.",
    date_reported: "2025-09-19",
    repair_start_date: "",
    repair_completion_date: "",
    repair_cost: 180.00
  },
  {
    asset_id: asset_testcases[32].asset_id, // USB Port Asset 33
    category_id: 1, // Internal
    user_id: 209,
    department_id: 303,
    issue: "USB port not recognizing connected devices",
    urgency_id: 2, // High
    status_id: 2, // Completed
    repair_request_id: 5010,
    company_id: 1,
    sub_category_id: 4, // Ports
    type_id: 1,
    remarks: "Port cleaned and driver updated. Fully functional now.",
    date_reported: "2025-09-05",
    repair_start_date: "2025-09-06",
    repair_completion_date: "2025-09-07",
    repair_cost: 25.00
  },
  {
    asset_id: asset_testcases[71].asset_id, // Mouse Asset 72 (External)
    category_id: 2, // External
    user_id: 213,
    department_id: 304,
    issue: "Wireless mouse not responding and battery draining fast",
    urgency_id: 1, // Low
    status_id: 2, // Completed
    repair_request_id: 5011,
    company_id: 1,
    sub_category_id: 10, // Accessories (External)
    type_id: 2,
    remarks: "Receiver reconnected and battery replaced. Working perfectly.",
    date_reported: "2025-09-14",
    repair_start_date: "2025-09-15",
    repair_completion_date: "2025-09-16",
    repair_cost: 10.00
  },
  {
    asset_id: asset_testcases[95].asset_id, // Extra Asset 96
    category_id: 1, // Internal
    user_id: 207,
    department_id: 302,
    issue: "Asset making unusual clicking sounds during operation",
    urgency_id: 3, // Critical
    status_id: 1, // In Progress
    repair_request_id: 5012,
    company_id: 1,
    sub_category_id: 6, // Based on asset data
    type_id: 3,
    remarks: "Mechanical component inspection in progress. Replacement parts ordered.",
    date_reported: "2025-09-22",
    repair_start_date: "2025-09-23",
    repair_completion_date: "",
    repair_cost: 280.00
  }
];

// Reference data for display purposes
export const urgency_levels = {
  1: "Low",
  2: "High", 
  3: "Critical"
};

export const repair_status = {
  1: "In Progress",
  2: "Completed",
  3: "Pending"
};

export const departments = {
  301: "IT Department",
  302: "Finance Department", 
  303: "HR Department",
  304: "Marketing Department",
  305: "Operations Department",
  306: "Administration"
};

export const users = {
  201: "John Smith",
  203: "Sarah Johnson", 
  204: "Mike Chen",
  205: "Lisa Davis",
  206: "Robert Wilson",
  207: "Emma Brown",
  208: "David Lee",
  209: "Jennifer Taylor",
  210: "Alex Martinez",
  212: "Rachel Green",
  213: "Tom Anderson",
  215: "Maria Rodriguez"
};
