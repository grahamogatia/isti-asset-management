import { Popover, PopoverContent } from "./popover";
import { useState } from "react";
import FilterTrigger from "../pages/filters/FilterTrigger";
import FilterColumnList from "../pages/filters/FilterColumnList";
import FilterValueList from "../pages/filters/FilterValueList";

interface FiltersProps {
  filterableColumns: string[];
  data: any[];
}

function Filters({ filterableColumns, data }: FiltersProps) {
  const [currentScreen, setCurrentScreen] = useState<string>("columns");
  const [selectedColumn, setSelectedColumn] = useState<string>("");

  return (
    <Popover>
      <FilterTrigger />
      <PopoverContent className="w-auto p-4 min-w-64">
        {currentScreen === "columns" ? (
          <FilterColumnList
            filterableColumns={filterableColumns}
            setSelectedColumn={setSelectedColumn}
            setCurrentScreen={setCurrentScreen}
          />
        ) : (
          <FilterValueList
            data={data}
            selectedColumn={selectedColumn}
            setCurrentScreen={setCurrentScreen}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}

export default Filters;
