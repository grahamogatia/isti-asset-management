export type Asset_Category = {
    category_id: number,
    category_name: "Internal" | "External";
}

export interface Asset_Sub_Category extends Asset_Category {
    sub_category_id: number,
    sub_category_name: string,
    code: string
}

export interface Asset_Type extends Asset_Sub_Category {
    type_id?: number,
    type_name?: string,
    type_code?: number
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
