import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { formatColumnName, getColumnIcon } from "@/lib/columnNameUtils";
import { getDisplayNameForColumn } from "@/lib/lookups";
import { useState } from "react";

interface FilterValueListProps {
  data: any[];
  selectedColumn: string;
  setCurrentScreen: (type: string) => void;
}

function FilterValueList({
  data,
  selectedColumn,
  setCurrentScreen,
}: FilterValueListProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const getActualColumnName = (displayColumnName: string): string => {
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
    <div>
      <p className="flex items-center gap-2 mb-3 opacity-60">
        {(() => {
          const IconComponent = getColumnIcon(selectedColumn);
          return <IconComponent className="h-4 w-4" />;
        })()}
        {formatColumnName(selectedColumn)}{" "}
        <span className="font-semibold">is</span>
      </p>
      {getUniqueValues(selectedColumn)?.map((value, index) => {
        return (
          <div
            key={index}
            className="flex items-center space-x-3 py-1.5 px-2 hover:bg-gray-50 rounded-md cursor-pointer group transition-colors duration-150"
          >
            <input
              type="checkbox"
              id={`filter-${selectedColumn}-${index}`}
              checked={selectedFilters.includes(value)}
              className="h-4 w-4 rounded-sm border border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 focus:ring-offset-0 transition-all duration-150"
              onChange={(e) => {
                if (e.target.checked) {
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
                console.log("Selected filters:", selectedFilters);
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
      <Button onClick={() => setCurrentScreen("columns")}>Back</Button>
    </div>
  );
}

export default FilterValueList;