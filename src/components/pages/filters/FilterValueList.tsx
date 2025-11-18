import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  formatColumnName,
  getActualColumnName,
  getColumnIcon,
} from "@/lib/columnNameUtils";
import { ArrowLeft, Plus } from "lucide-react";
import { useState } from "react";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";

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
  const { getDisplayNameForColumn } = useLookupFunctions();
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [amountMin, setAmountMin] = useState<string>("");
  const [amountMax, setAmountMax] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

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

  const actualColumnName = getActualColumnName(selectedColumn);
  const isAmountColumn =
    actualColumnName && String(actualColumnName).toLowerCase().includes("amount");
  const isDateColumn =
    actualColumnName && String(actualColumnName).toLowerCase().includes("date");

  const handleApply = () => {
    if (!onFiltersChange) return;

    if (isAmountColumn) {
      // send [min, max] (empty string allowed)
      onFiltersChange(selectedColumn, [amountMin ?? "", amountMax ?? ""]);
      setAmountMin("");
      setAmountMax("");
    } else if (isDateColumn) {
      // require both dates for range
      onFiltersChange(selectedColumn, [dateFrom, dateTo]);
      setDateFrom("");
      setDateTo("");
    } else {
      onFiltersChange(selectedColumn, selectedFilters);
      setSelectedFilters([]);
    }

    setCurrentScreen("columns");
  };

  const amountValid = amountMin !== "" || amountMax !== "";
  const dateValid = dateFrom !== "" && dateTo !== "";

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
            setAmountMin("");
            setAmountMax("");
            setDateFrom("");
            setDateTo("");
          }}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>

      {isAmountColumn ? (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Enter amount range</div>
          <div className="flex gap-2 items-center">
            <Input
              type="number"
              placeholder="Min"
              value={amountMin}
              onChange={(e) => setAmountMin(e.currentTarget.value)}
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={amountMax}
              onChange={(e) => setAmountMax(e.currentTarget.value)}
              className="w-32"
            />
          </div>
        </div>
      ) : isDateColumn ? (
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">Select date range</div>
          <div className="flex gap-2 items-center">
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.currentTarget.value)}
              className="w-40"
            />
            <span className="text-sm text-muted-foreground">to</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.currentTarget.value)}
              className="w-40"
            />
          </div>
        </div>
      ) : (
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
      )}

      <Button
        onClick={handleApply}
        disabled={
          isAmountColumn ? !amountValid : isDateColumn ? !dateValid : selectedFilters.length === 0
        }
        variant={
          isAmountColumn
            ? amountValid
              ? "default"
              : "outline"
            : isDateColumn
            ? dateValid
              ? "default"
              : "outline"
            : selectedFilters.length === 0
            ? "outline"
            : "default"
        }
      >
        {isAmountColumn ? (
          amountValid ? (
            <>
              <Plus />
              {`Apply range`}
            </>
          ) : (
            "Enter range"
          )
        ) : isDateColumn ? (
          dateValid ? (
            <>
              <Plus />
              Apply range
            </>
          ) : (
            "Select dates"
          )
        ) : selectedFilters.length === 0 ? (
          "Select filters"
        ) : (
          <>
            <Plus />
            {`Apply ${selectedFilters.length} filter${selectedFilters.length === 1 ? "" : "s"}`}
          </>
        )}
      </Button>
    </div>
  );
}

export default FilterValueList;
