import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import { getColumnIcon } from "@/lib/header_format";
import { Plus, Search } from "lucide-react";
import { getDisplayNameForColumn } from "@/lib/lookups";

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
            <p>Filtering by: {formatColumnName(selectedColumn)}</p>
            <Button onClick={() => setCurrentScreen("columns")}>Back</Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Filters;
