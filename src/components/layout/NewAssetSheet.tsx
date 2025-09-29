import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";
import { Plus } from "lucide-react";
import { HeroHighlightDemo } from "../ui/custom-hero-higlight";

function NewAssetSheet({
  type,
  form,
}: {
  type: string;
  form: React.ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-[#4a47c6] text-white hover:bg-[#3d3bb0] gap-0">
          <Plus className="mr-1" />
          New
        </Button>
      </SheetTrigger>
      <SheetContent className="max-w-none flex flex-col h-full lg:max-w-[30vw]">
  <SheetHeader className="flex-shrink-0 pl-6 pr-6 pt-6 pb-2">
    <SheetTitle className="flex text-xl items-center gap-1">
      Add a New <HeroHighlightDemo toHighlight={type} />
    </SheetTitle>
    <SheetDescription>
      Fill out the {type} details below and click save to add it to your
      inventory.
    </SheetDescription>
  </SheetHeader>
  
  <div className="flex-1 overflow-y-auto px-4 py-">
    {form}
  </div>
  
  <SheetFooter className="flex-shrink-0 mt-4">
    <Button type="submit">Save changes</Button>
    <SheetClose asChild>
      <Button variant="outline">Close</Button>
    </SheetClose>
  </SheetFooter>
</SheetContent>
    </Sheet>
  );
}

export default NewAssetSheet;
