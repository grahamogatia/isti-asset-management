import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatColumnName, getColumnIcon } from "@/lib/columnNameUtils";
import { Search } from "lucide-react";
import { useState } from "react";

interface FilterColumnListProps {
  filterableColumns: string[];
  setSelectedColumn: (type: string) => void;
  setCurrentScreen: (type: string) => void;
}

function FilterColumnList({
  filterableColumns,
  setSelectedColumn,
  setCurrentScreen,
}: FilterColumnListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredColumns = filterableColumns.filter((column) =>
    column.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
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
  );
}

export default FilterColumnList;
