import { Button } from "@/components/ui/button";
import { PopoverTrigger } from "@/components/ui/popover";
import { Plus } from "lucide-react";

function FilterTrigger() {
    return (
        <PopoverTrigger className="flex" asChild>
        <Button
          variant="ghost"
          className="justify-start gap-1 rounded-full opacity-50"
        >
          <Plus className="h-4 w-4" /> Filter
        </Button>
      </PopoverTrigger> 
    );
}

export default FilterTrigger;