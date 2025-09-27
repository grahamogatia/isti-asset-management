import FilterChip from "./FilterChip";
import type { ActiveFilter } from "@/data/types";
import Filters from "@/components/ui/filters";

interface FilterBarProps {
  data: any[];
  activeFilters: ActiveFilter[];
  availableColumns: string[];
  onFiltersChange: (columnName: string, values: string[]) => void;
  onEditFilter: (columnName: string) => void;
  onDeleteFilter: (columnName: string) => void;
}

function FilterBar({ 
  data,
  activeFilters, 
  availableColumns, 
  onFiltersChange,
  onEditFilter, 
  onDeleteFilter 
}: FilterBarProps) {
  // Don't render if no filters and no available columns
  if (activeFilters.length === 0 && availableColumns.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 py-2">
      {/* Render active filter chips */}
      {activeFilters.map(filter => (
        <FilterChip
          key={filter.id}
          filter={filter}
          onEdit={onEditFilter}
          onDelete={onDeleteFilter}
        />
      ))}
      
      {/* Add Filter button - only show if there are available columns */}
      {availableColumns.length > 0 && (
        <Filters filterableColumns={availableColumns} data={data} onFiltersChange={onFiltersChange}/>
      )}
    </div>
  );
}

export default FilterBar;