import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import type { Asset_Type } from "@/data/types";
import { ChevronDown } from "lucide-react";

interface AssetTypeDropdownProps {
  assetTypes: Asset_Type[];
  selectedType: string;
  setSelectedType: (type: string) => void;
}

function AssetTypeDropdown({
  assetTypes,
  selectedType,
  setSelectedType,
}: AssetTypeDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="min-w-[120px] flex items-center justify-between"
        >
          {selectedType === "All"
            ? "All Types"
            : assetTypes.find(
                (assetType) => selectedType === String(assetType.type_id)
              )?.type_name}
          <ChevronDown/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Asset Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={selectedType === "All"}
          onCheckedChange={() => setSelectedType("All")}
        >
          All
        </DropdownMenuCheckboxItem>
        {assetTypes.map((assetType) => (
          <DropdownMenuCheckboxItem
            key={assetType.type_id}
            checked={selectedType === String(assetType.type_id)}
            onCheckedChange={() => setSelectedType(String(assetType.type_id))}
          >
            {assetType.type_name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AssetTypeDropdown;
