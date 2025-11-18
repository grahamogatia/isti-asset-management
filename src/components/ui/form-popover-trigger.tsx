import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface FormPopoverTriggerProps {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
}

function FormPopoverTrigger({
  icon: IconComponent,
  name,
}: FormPopoverTriggerProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PopoverTrigger asChild>
          <Button variant="outline">
            <IconComponent className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default FormPopoverTrigger;
