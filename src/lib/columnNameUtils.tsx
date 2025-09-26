import { Button } from "@/components/ui/button";
import { 
  Package, 
  Hash, 
  Tag, 
  Layers, 
  User, 
  Building2, 
  Building, 
  Calendar, 
  DollarSign, 
  Wrench, 
  CheckCircle, 
  AlertTriangle, 
  Cpu, 
  Award, 
  FileImage, 
  Shield, 
  MapPin, 
  ScrollText, 
  Clock,
  TrendingDown,
  ArrowUpDown,
  PhilippinePeso,
  Tally4,
  Bookmark
} from "lucide-react";

export function getColumnIcon (column: string) {
  const columnIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    // Asset columns
    asset_id: Hash,
    asset_name: Package,
    category: Layers,
    category_id: Layers,
    sub_category: Tag,
    sub_category_id: Tag,
    type: Bookmark,
    type_id: Bookmark,
    serial_number: Tally4,
    brand: Award,
    file: FileImage,
    specifications: Cpu,
    asset_amount: DollarSign,
    asset_condition_id: CheckCircle,
    status_id: AlertTriangle,
    warranty_duration: Clock,
    warranty_due_date: Calendar,
    purchase_date: Calendar,
    aging: Clock,
    asset_value: TrendingDown,
    notes: ScrollText,
    insurance_id: Shield,
    location: MapPin,
    condition: Wrench,
    
    // People & organization
    employee: User,
    user_id: User,
    department: Building2,
    department_id: Building2,
    company: Building,
    company_id: Building,
    
    // Common date columns
    date_borrowed: Calendar,
    due_date: Calendar,
    return_date: Calendar,
    date_reported: Calendar,
    repair_start_date: Calendar,
    repair_completion_date: Calendar,
    issuance_date: Calendar,
    pullout_date: Calendar,
    
    // Transaction/Process columns
    borrow_transaction_id: Hash,
    repair_request_id: Hash,
    issuance_id: Hash,
    issue: AlertTriangle,
    urgency: AlertTriangle,
    urgency_id: AlertTriangle,
    status: AlertTriangle,
    repair_cost: PhilippinePeso,
    duration: Clock,
    remarks: ScrollText,

    // Money
  };

  const IconComponent = columnIcons[column];
  return IconComponent || Package; // Default to Package icon if no mapping found
}

export function createHeaderWithIcon(columnName: string, displayName: string) {
    return () => {
    const IconComponent = getColumnIcon(columnName);
    return (
      <div className="flex items-center gap-2">
        <IconComponent className="h-4 w-4" />
        {displayName}
      </div>
    );
  };
}

export const createSortableHeaderWithIcon = (columnName: string, displayName: string) => ({ column }: any) => {
    const IconComponent = getColumnIcon(columnName);
    return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="flex items-center gap-2"
    >
      <IconComponent className="h-4 w-4" />
      {displayName}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};

export const formatColumnName = (column: string) => {
    return column
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

export const getActualColumnName = (displayColumnName: string): string => {
    const columnMapping: Record<string, string> = {
      category: "category_id",
      sub_category: "sub_category_id",
      type: "type_id",
      condition: "asset_condition_id",
      department: "department_id",
      company: "company_id",
      employee: "user_id",
      status: "status_id",
      urgency: "urgency_id",
      insurance: "insurance_id",
    };
    return columnMapping[displayColumnName] || displayColumnName;
  };

// Standard filter function for handling multiple filter values
export const createStandardFilterFn = (getValueFn: (row: any) => string | null | undefined) => {
  return (row: any, _columnId: string, filterValue: any) => {
    const rowValue = getValueFn(row);
    if (Array.isArray(filterValue)) {
      return filterValue.includes(rowValue);
    }
    return rowValue === filterValue;
  };
};