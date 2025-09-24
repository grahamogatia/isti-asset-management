export type Asset_Category = {
  category_id: number;
  category_name: "Internal" | "External" | "Events";
};

export interface Asset_Sub_Category extends Asset_Category {
  sub_category_id: number;
  sub_category_name: string;
  code: string;
}

export interface Asset_Type extends Asset_Sub_Category {
  type_id?: number;
  type_name?: string;
  type_code?: number;
}

export type Asset = {
  asset_id: number;
  asset_name: string;
  category_id: number; // Internal or External (to add: Events)
  sub_category_id: number; // Laptop, Network Devices, etc
  asset_condition_id: number;
  location?: string;
  status_id: number;
  serial_number: string;
  brand: string;
  specifications: string;
  asset_amount: number;
  warranty_duration: number;
  warranty_due_date: string;
  purchase_date: string;
  notes: string;
  type_id?: number; // Specifc
  file: string;
  insurance_id?: string;
};

export type Repair = {
  asset_id: number;
  category_id: number;
  user_id: number;
  department_id: number;
  issue: string;
  urgency_id: number;
  status_id: number;
  repair_request_id: number;
  company_id: number;
  sub_category_id: number;
  type_id: number;
  remarks: string;
  date_reported: string;
  repair_start_date: string;
  repair_completion_date: string;
  repair_cost: number;
};

export type Borrow = {
  asset_id: number;
  category_id: number;
  user_id: number;
  department_id: number;
  date_borrowed: string;
  asset_condition_id: string;
  borrow_transaction_id: string;
  company_id: number;
  sub_category_id: number;
  type_id: number;
  due_date: string;
  return_date: string;
  duration: number;
  remarks: string;
};

export type Issuance = {
  asset_id: number;
  category_id: number;
  user_id: number;
  department_id: number;
  issuance_date: string;
  pullout_date: string;
  status_id: number;
  remarks: string;
  issuance_id: number;
  sub_category_id: number;
  type_id: number;
  company_id: number;
};
