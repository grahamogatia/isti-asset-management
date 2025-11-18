import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "./button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface FormPopoverTriggerProps {
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  variant?: React.ComponentProps<typeof Button>["variant"];
}

function FormPopoverTrigger({
  icon: IconComponent,
  name,
  variant = "outline",
}: FormPopoverTriggerProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <PopoverTrigger asChild>
          <Button variant={variant}>
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
