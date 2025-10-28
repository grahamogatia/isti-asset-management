import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { HeroHighlightDemo } from "../ui/custom-hero-higlight";
import { cloneElement, isValidElement, useState } from "react";

interface FormSheetProps {
  type: string;
  taskName: string;
  button: React.ReactNode;
  form: React.ReactNode;
}

function FormSheet({ type, taskName, button, form }: FormSheetProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    // Add a small delay for smooth transition
    setTimeout(() => {
      setOpen(false);
    }, 300);
  };

  const formWithCallback = isValidElement(form)
    ? cloneElement(form as React.ReactElement<any>, {
        onSuccess: handleSuccess,
      })
    : form;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{button}</SheetTrigger>
      <SheetContent className="max-w-none flex flex-col h-full lg:max-w-[40vw] transition-all duration-300 ease-in-out">
        <SheetHeader className="flex-shrink-0 pl-6 pr-6 pt-6 pb-2">
          <SheetTitle className="flex text-xl items-center gap-1">
            {taskName} <HeroHighlightDemo toHighlight={type} />
          </SheetTitle>
          <SheetDescription>
            {taskName === "Add a New"
              ? `Fill in the details below to add a new ${type.toLowerCase()}.`
              : `Update the details below for this ${type.toLowerCase()}.`}{" "}
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {formWithCallback}
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default FormSheet;