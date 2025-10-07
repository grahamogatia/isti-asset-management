import { Label } from "@/components/ui/label";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { cn } from "@/lib/utils";

interface DisplayFieldProps {
  name: string;
  label: string;
  children: React.ReactNode;
  className?: string;
  borderColor?: string;
  backgroundColor?: string;
}

function DisplayField({ 
  name, 
  label, 
  children, 
  className,
  borderColor = "#5d5bd0",
  backgroundColor = "#f1f1fb"
}: DisplayFieldProps) {
  const IconComponent = getColumnIcon(name);
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label className="flex items-center gap-2">
        <IconComponent className="h-4 w-4" />
        {label}
      </Label>
      <div 
        className="border rounded-md p-3"
        style={{ 
          borderColor, 
          backgroundColor 
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default DisplayField;