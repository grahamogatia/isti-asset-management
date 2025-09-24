import { Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";

function Filters({ filterableColumns }: { filterableColumns: string[] }) {
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
      <PopoverContent className="w-auto grid">
        {filterableColumns.map((column) => {
          return (
            <div className="grid gap-4">
                <div className="space-y-2">
                    <Button>{column}</Button>
                </div>
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export default Filters;
