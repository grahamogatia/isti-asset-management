import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import { getColumnIcon } from "@/lib/header_format";
import { Plus, Search } from "lucide-react";
import { getDisplayNameForColumn } from "@/lib/lookups";
import { Label } from "./label";

function Filters({
  filterableColumns,
  data,
}: {
  filterableColumns: string[];
  data: any[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentScreen, setCurrentScreen] = useState<string>("columns");
  const [selectedColumn, setSelectedColumn] = useState<string>("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const filteredColumns = filterableColumns.filter((column) =>
    column.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatColumnName = (column: string) => {
    return column
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

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
    console.log("Column: ", columnName);

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
    <Popover>
      <PopoverTrigger className="flex" asChild>
        <Button
          variant="ghost"
          className="justify-start gap-1 text-xs h-auto has-[>svg]:px-0 opacity-50"
        >
          <Plus className="h-4 w-4" /> Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 min-w-64">
        {currentScreen === "columns" ? (
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Filter by..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-8"
              />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filteredColumns.map((column) => {
                const IconComponent = getColumnIcon(column);
                return (
                  <div key={column} className="py-1">
                    <Button
                      variant="ghost"
                      className="w-full justify-start h-8 px-2 text-sm hover:bg-gray-100 gap-2"
                      onClick={() => {
                        setSelectedColumn(column);
                        setCurrentScreen("filters");
                      }}
                    >
                      <IconComponent className="h-4 w-4 text-gray-500" />
                      {formatColumnName(column)}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
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
                        setSelectedFilters(prev => 
                          prev.includes(value) ? prev : [...prev, value]
                        );
                      } else {
                        // Remove from selected filters
                        setSelectedFilters(prev => 
                          prev.filter(item => item !== value)
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
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Filters;
