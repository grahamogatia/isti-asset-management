import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { formatColumnName, getActualColumnName, getColumnIcon } from "@/lib/columnNameUtils";
import { getDisplayNameForColumn } from "@/lib/lookups";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";

interface FilterValueListProps {
  data: any[];
  selectedColumn: string;
  setCurrentScreen: (type: string) => void;
  onFiltersChange?: (columnName: string, values: string[]) => void;
}

function FilterValueList({
  data,
  selectedColumn,
  setCurrentScreen,
  onFiltersChange,
}: FilterValueListProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const getUniqueValues = (columnName: string) => {
    if (!data || data.length === 0) return;

    // Map columnNames to proper attributes of the data
    const actualColumnName = getActualColumnName(columnName);
    const valuesID = data
      .map((row) => row[actualColumnName])
      .filter((value) => value != null)
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a - b);

    // Return to presentable names
    const valuesName = valuesID.map((id) =>
      getDisplayNameForColumn(actualColumnName, id)
    );
    return valuesName;
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between opacity-60">
        <p className="flex items-center gap-1">
          {(() => {
            const IconComponent = getColumnIcon(selectedColumn);
            return <IconComponent className="h-4 w-4" />;
          })()}
          {formatColumnName(selectedColumn)}{" "}
          <span className="font-semibold">is</span>
        </p>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setCurrentScreen("columns");
            setSelectedFilters([]);
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
      <div className="max-h-48 overflow-y-auto space-y-1">
        {getUniqueValues(selectedColumn)?.map((value, index) => {
          return (
            <div
              key={index}
              className="flex items-center space-x-3 py-1.5 px-2 hover:bg-gray-50 rounded-md cursor-pointer group transition-colors duration-150"
            >
              <Checkbox
                id={`filter-${selectedColumn}-${index}`}
                checked={selectedFilters.includes(value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    // Add to selected filters (avoid duplicates)
                    setSelectedFilters((prev) =>
                      prev.includes(value) ? prev : [...prev, value]
                    );
                  } else {
                    // Remove from selected filters
                    setSelectedFilters((prev) =>
                      prev.filter((item) => item !== value)
                    );
                  }
                }}
              />
              <Label
                htmlFor={`filter-${selectedColumn}-${index}`}
                className="text-sm text-gray-700 cursor-pointer select-none flex-1 group-hover:text-gray-900 transition-colors duration-150"
              >
                {value}
              </Label>
            </div>
          );
        })}
      </div>
      <Button
        onClick={() => {
          if (onFiltersChange) {
            onFiltersChange(selectedColumn, selectedFilters);
          }
          setSelectedFilters([]);
          setCurrentScreen("columns");
        }}
        disabled={selectedFilters.length === 0}
        variant={selectedFilters.length === 0 ? "outline" : "default"}
      >
        {selectedFilters.length === 0
          ? "Select filters"
          : (
              <>
                <Plus />
                {`Apply ${selectedFilters.length} filter${
                  selectedFilters.length === 1 ? "" : "s"
                }`}
              </>
            )
        }
      </Button>
    </div>
  );
}

export default FilterValueList;
