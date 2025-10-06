import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import DisplayAsset from "@/components/ui/display-asset";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Asset } from "@/data/types";
import { getColumnIcon } from "@/lib/columnNameUtils";
import {
  getCategoryName,
  getSubCategoryName,
  getTypeName,
} from "@/lib/lookups";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Control } from "react-hook-form";

interface FormFieldAssetComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  assets: Asset[];
  form: any;
}

function FormFieldAssetCombobox({
  control,
  name,
  label,
  assets,
  form,
}: FormFieldAssetComboboxProps) {
  const IconComponent = getColumnIcon("asset_name");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedAsset = field.value
          ? assets.find((asset) => asset.asset_id === field.value)
          : null;

        return (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
              <IconComponent className="h-4 w-4" />
              {label}
            </FormLabel>
            <FormControl>
              <Popover modal>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "justify-between w-full h-auto min-h-[2.5rem] px-3 py-2",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <div className="flex-1 text-left">
                        {selectedAsset ? (
                          <DisplayAsset
                            asset_name={selectedAsset.asset_name as string}
                            category={getCategoryName(
                              selectedAsset.category_id
                            )}
                            sub_category={getSubCategoryName(
                              selectedAsset.sub_category_id
                            )}
                            type={getTypeName(selectedAsset.type_id)}
                          />
                        ) : (
                          <span className="text-muted-foreground">
                            Select Asset
                          </span>
                        )}
                      </div>
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                  {" "}
                  {/* Increased width for better display */}
                  <Command>
                    <CommandInput
                      placeholder="Search asset..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No asset found.</CommandEmpty>
                      <CommandGroup>
                        {assets
                          .sort((a, b) =>
                            (a.asset_name || "").localeCompare(
                              b.asset_name || ""
                            )
                          )
                          .map((asset) => (
                            <CommandItem
                              value={asset.asset_name}
                              key={asset.asset_id}
                              onSelect={() => {
                                field.onChange(asset.asset_id);
                                form.setValue("type_id", asset.type_id);
                                form.setValue(
                                  "sub_category_id",
                                  asset.sub_category_id
                                );
                                form.setValue("category_id", asset.category_id);
                              }}
                              className="cursor-pointer"
                            >
                              <div className="flex-1">
                                <DisplayAsset
                                  asset_name={asset.asset_name as string}
                                  category={getCategoryName(asset.category_id)}
                                  sub_category={getSubCategoryName(
                                    asset.sub_category_id
                                  )}
                                  type={getTypeName(asset.type_id)}
                                />
                              </div>
                              <Check
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  asset.asset_id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default FormFieldAssetCombobox;
