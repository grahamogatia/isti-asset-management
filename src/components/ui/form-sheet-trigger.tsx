import { Button } from "./button";
import { SheetTrigger } from "./sheet";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface FormSheetTriggerProps {
  icon: React.ComponentType<{ className?: string }>;
  buttonName?: string;
  name: string;
}

function FormSheetTrigger({ icon: IconComponent, buttonName, name }: FormSheetTriggerProps) {

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <SheetTrigger asChild>
          <Button variant="outline">
            <IconComponent className="h-4 w-4" /> {buttonName}
          </Button>
        </SheetTrigger>
      </TooltipTrigger>
      <TooltipContent side="top">
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default FormSheetTrigger;
