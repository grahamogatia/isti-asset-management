import type { Borrow } from "@/data/types";
import { asset_testcases } from "./assets";

export const borrow_testcases: Borrow[] = [
  {
    asset_id: asset_testcases[1].asset_id, // Dell XPS 13 Asset 2
    category_id: 1, // Internal
    user_id: 301,
    department_id: 401,
    date_borrowed: "2025-09-01",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-001",
    company_id: 1,
    sub_category_id: 1, // Laptop
    type_id: 1,
    due_date: "2025-09-15",
    return_date: "2025-09-14",
    duration: 14,
    remarks: "Borrowed for field work. Returned in good condition.",
  },
  {
    asset_id: asset_testcases[4].asset_id, // MacBook Pro Asset 5
    category_id: 1, // Internal
    user_id: 302,
    department_id: 402,
    date_borrowed: "2025-09-10",
    asset_condition_id: "2", // Good
    borrow_transaction_id: "BT-2025-002",
    company_id: 1,
    sub_category_id: 1, // Laptop
    type_id: 2,
    due_date: "2025-09-30",
    return_date: "",
    duration: 20,
    remarks: "Borrowed for remote presentation work. Still in use.",
  },
  {
    asset_id: asset_testcases[13].asset_id, // Cisco Switch Asset 14
    category_id: 1, // Internal
    user_id: 303,
    department_id: 403,
    date_borrowed: "2025-08-25",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-003",
    company_id: 1,
    sub_category_id: 2, // Network
    type_id: 1,
    due_date: "2025-09-08",
    return_date: "",
    duration: 14,
    remarks: "Network setup for temporary office. Overdue return.",
  },
  {
    asset_id: asset_testcases[21].asset_id, // Cat6 Cable Asset 22
    category_id: 1, // Internal
    user_id: 304,
    department_id: 401,
    date_borrowed: "2025-09-15",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-004",
    company_id: 1,
    sub_category_id: 3, // Cables
    type_id: 1,
    due_date: "2025-09-25",
    return_date: "2025-09-24",
    duration: 10,
    remarks: "Cable for network extension project. Completed successfully.",
  },
  {
    asset_id: asset_testcases[37].asset_id, // Docking Station Asset 38
    category_id: 1, // Internal
    user_id: 305,
    department_id: 404,
    date_borrowed: "2025-09-05",
    asset_condition_id: "2", // Good
    borrow_transaction_id: "BT-2025-005",
    company_id: 1,
    sub_category_id: 5, // Accessories
    type_id: 1,
    due_date: "2025-09-19",
    return_date: "2025-09-18",
    duration: 14,
    remarks: "Docking station for home office setup. Returned on time.",
  },
  {
    asset_id: asset_testcases[48].asset_id, // MacBook Pro Asset 49 (External)
    category_id: 2, // External
    user_id: 306,
    department_id: 405,
    date_borrowed: "2025-09-12",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-006",
    company_id: 1,
    sub_category_id: 6, // Laptop (External)
    type_id: 2,
    due_date: "2025-10-12",
    return_date: "",
    duration: 30,
    remarks: "Extended loan for project development. Long-term assignment.",
  },
  {
    asset_id: asset_testcases[56].asset_id, // Cisco Switch Asset 57 (External)
    category_id: 2, // External
    user_id: 307,
    department_id: 402,
    date_borrowed: "2025-09-08",
    asset_condition_id: "2", // Good
    borrow_transaction_id: "BT-2025-007",
    company_id: 1,
    sub_category_id: 7, // Network (External)
    type_id: 1,
    due_date: "2025-09-22",
    return_date: "2025-09-21",
    duration: 14,
    remarks: "Network equipment for client site deployment. Mission completed.",
  },
  {
    asset_id: asset_testcases[65].asset_id, // HDMI Cable Asset 66 (External)
    category_id: 2, // External
    user_id: 308,
    department_id: 403,
    date_borrowed: "2025-09-18",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-008",
    company_id: 1,
    sub_category_id: 8, // Cables (External)
    type_id: 2,
    due_date: "2025-09-28",
    return_date: "",
    duration: 10,
    remarks: "HDMI cable for client presentation setup. Currently in use.",
  },
  {
    asset_id: asset_testcases[29].asset_id, // USB Port Asset 30
    category_id: 1, // Internal
    user_id: 309,
    department_id: 404,
    date_borrowed: "2025-08-30",
    asset_condition_id: "3", // Fair
    borrow_transaction_id: "BT-2025-009",
    company_id: 1,
    sub_category_id: 4, // Ports
    type_id: 1,
    due_date: "2025-09-13",
    return_date: "",
    duration: 14,
    remarks: "USB hub for workstation expansion. Return overdue.",
  },
  {
    asset_id: asset_testcases[41].asset_id, // Mouse Asset 42
    category_id: 1, // Internal
    user_id: 310,
    department_id: 405,
    date_borrowed: "2025-09-20",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-010",
    company_id: 1,
    sub_category_id: 5, // Accessories
    type_id: 2,
    due_date: "2025-10-04",
    return_date: "",
    duration: 14,
    remarks: "Wireless mouse for temporary workstation. Active loan.",
  },
  {
    asset_id: asset_testcases[7].asset_id, // Lenovo ThinkPad Asset 8
    category_id: 1, // Internal
    user_id: 311,
    department_id: 401,
    date_borrowed: "2025-09-03",
    asset_condition_id: "2", // Good
    borrow_transaction_id: "BT-2025-011",
    company_id: 1,
    sub_category_id: 1, // Laptop
    type_id: 3,
    due_date: "2025-09-17",
    return_date: "2025-09-16",
    duration: 14,
    remarks: "Laptop for business trip. Returned with minor wear.",
  },
  {
    asset_id: asset_testcases[74].asset_id, // Keyboard Asset 75 (External)
    category_id: 2, // External
    user_id: 312,
    department_id: 402,
    date_borrowed: "2025-09-16",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-012",
    company_id: 1,
    sub_category_id: 10, // Accessories (External)
    type_id: 3,
    due_date: "2025-09-30",
    return_date: "",
    duration: 14,
    remarks: "Mechanical keyboard for ergonomic workstation setup.",
  },
  {
    asset_id: asset_testcases[16].asset_id, // Netgear Hub Asset 17
    category_id: 1, // Internal
    user_id: 313,
    department_id: 403,
    date_borrowed: "2025-09-11",
    asset_condition_id: "2", // Good
    borrow_transaction_id: "BT-2025-013",
    company_id: 1,
    sub_category_id: 2, // Network
    type_id: 3,
    due_date: "2025-09-25",
    return_date: "2025-09-23",
    duration: 14,
    remarks: "Network hub for conference room setup. Project completed.",
  },
  {
    asset_id: asset_testcases[89].asset_id, // Extra Asset 90
    category_id: 1, // Internal
    user_id: 314,
    department_id: 404,
    date_borrowed: "2025-09-22",
    asset_condition_id: "1", // Excellent
    borrow_transaction_id: "BT-2025-014",
    company_id: 1,
    sub_category_id: 10, // Based on asset data
    type_id: 1,
    due_date: "2025-10-06",
    return_date: "",
    duration: 14,
    remarks: "Equipment for testing and evaluation purposes.",
  },
  {
    asset_id: asset_testcases[25].asset_id, // USB-C Cable Asset 26
    category_id: 1, // Internal
    user_id: 315,
    department_id: 405,
    date_borrowed: "2025-08-28",
    asset_condition_id: "2", // Good
    borrow_transaction_id: "BT-2025-015",
    company_id: 1,
    sub_category_id: 3, // Cables
    type_id: 3,
    due_date: "2025-09-11",
    return_date: "2025-09-10",
    duration: 14,
    remarks: "USB-C cable for device charging and data transfer. Completed.",
  },
];

// Reference data for display purposes
export const borrow_users = {
  301: "Alice Johnson",
  302: "Bob Smith",
  303: "Carol Davis",
  304: "David Wilson",
  305: "Emma Brown",
  306: "Frank Miller",
  307: "Grace Lee",
  308: "Henry Taylor",
  309: "Iris Chen",
  310: "Jack Anderson",
  311: "Kate Rodriguez",
  312: "Liam Thompson",
  313: "Maya Patel",
  314: "Noah Garcia",
  315: "Olivia Martinez",
};

export const borrow_departments = {
  401: "Engineering",
  402: "Sales Department",
  403: "Marketing",
  404: "Operations",
  405: "Research & Development",
};

export const asset_conditions = {
  "1": "Excellent",
  "2": "Good",
  "3": "Fair",
  "4": "Poor",
};
