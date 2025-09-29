import { Label } from "@radix-ui/react-dropdown-menu";
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
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { HeroHighlightDemo } from "../ui/custom-hero-higlight";

function NewAssetSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="bg-[#4a47c6] text-white hover:bg-[#3d3bb0] gap-0">
          <Plus className="mr-1" />
          New
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:max-w-[50vw] max-w-none">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-1">
            Add a <HeroHighlightDemo toHighlight="New Asset"/>
          </SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label>Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label>Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        <SheetFooter>
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
