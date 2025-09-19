import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import type { Asset_Type } from "@/data/types";
import React from "react";

// ...existing code...
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
          {selectedType === "All" ? "All Types" : selectedType}
          <svg className="ml-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.25 4.39a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06z" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Asset Type</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={selectedType}
          onValueChange={setSelectedType}
        >
          <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
          {assetTypes.map((assetType) => (
            <DropdownMenuRadioItem
              key={assetType.type_id}
              value={String(assetType.type_id)}
            >
              {assetType.type_name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AssetTypeDropdown;
