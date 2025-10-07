import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { HeroHighlightDemo } from "../ui/custom-hero-higlight";

interface FormSheetProps {
  type: string,
  taskName: string,
  button: React.ReactNode
  form: React.ReactNode
}

function FormSheet({ type, taskName, button, form }: FormSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {button}
      </SheetTrigger>
      <SheetContent className="max-w-none flex flex-col h-full lg:max-w-[40vw]">
        <SheetHeader className="flex-shrink-0 pl-6 pr-6 pt-6 pb-2">
          <SheetTitle className="flex text-xl items-center gap-1">
            {taskName} <HeroHighlightDemo toHighlight={type} />
          </SheetTitle>
          <SheetDescription>
            Fill out the {type} details below.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-">{form}</div>
      </SheetContent>
    </Sheet>
  );
}

export default FormSheet;
