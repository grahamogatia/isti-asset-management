import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { ActiveFilter } from "@/data/types";
import { formatColumnName, getColumnIcon } from "@/lib/columnNameUtils";

interface FilterChipProps {
  filter: ActiveFilter;
  onEdit: (columnName: string) => void;
  onDelete: (columnName: string) => void;
}

function FilterChip({ filter, onEdit, onDelete }: FilterChipProps) {

    const IconComponent = getColumnIcon(filter.columnName);
    
  return (
    <div className="flex items-center gap-2 bg-[#f1f1fb] border rounded-full px-3 py-1.5 text-[#5d5bd0]">
      <Button
        variant="ghost" 
        size="sm"
        className="p-0 h-auto text-sm"
        onClick={() => onEdit(filter.columnName)}
      >
        <span className="text-sm font-medium flex gap-2 items-center">
            <IconComponent/>
            {filter.displayLabel}
        </span>
      </Button>
      <Button
        variant="ghost"
        size="sm" 
        className="p-0 h-auto w-4 h-4"
        onClick={() => onDelete(filter.columnName)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

export default FilterChip;