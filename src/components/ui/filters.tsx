
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Input } from "./input";
import { useState } from "react";
import { getColumnIcon } from "@/lib/header_format";
import { Plus, Search } from "lucide-react";

function Filters({ filterableColumns }: { filterableColumns: string[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter columns based on search term
  const filteredColumns = filterableColumns.filter((column) =>
    column.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to format column names
  const formatColumnName = (column: string) => {
    return column
      .replace(/_/g, " ") // Replace underscores with spaces
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
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
          
          {/* Filtered Columns */}
          <div className="max-h-48 overflow-y-auto">
            {filteredColumns.length > 0 ? (
              filteredColumns.map((column) => {
                const IconComponent = getColumnIcon(column);
                return (
                  <div key={column} className="py-1">
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start h-8 px-2 text-sm hover:bg-gray-100 gap-2"
                    >
                      <IconComponent className="h-4 w-4 text-gray-500" />
                      {formatColumnName(column)}
                    </Button>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-4 text-gray-500 text-sm">
                No columns found
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default Filters;
