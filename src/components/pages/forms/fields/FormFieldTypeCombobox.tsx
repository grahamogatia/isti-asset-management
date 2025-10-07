import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import DisplayType from "@/components/ui/display-type";
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
import type { Asset_Type } from "@/data/types";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Control } from "react-hook-form";

interface FormFieldTypeComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  assetTypes: Asset_Type[];
  form: any;
}

function FormFieldTypeCombobox({
  control,
  name,
  label,
  assetTypes,
  form,
}: FormFieldTypeComboboxProps) {
  const IconComponent = getColumnIcon(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedType = field.value
          ? assetTypes.find((type) => type.type_id === field.value)
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
                        {selectedType ? (
                          <DisplayType
                            category={selectedType.category_name}
                            sub_category={selectedType.sub_category_name}
                            type={selectedType.type_name}
                          />
                        ) : (
                          <span className="text-muted-foreground">
                            Select type
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
                      placeholder="Search type..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {assetTypes
                          .sort((a, b) =>
                            a.type_name.localeCompare(b.type_name)
                          )
                          .map((type) => (
                            <CommandItem
                              value={type.type_name}
                              key={type.type_id}
                              onSelect={() => {
                                form.setValue("type_id", type.type_id);
                                form.setValue(
                                  "sub_category_id",
                                  type.sub_category_id
                                );
                                form.setValue("category_id", type.category_id);
                              }}
                              className="cursor-pointer"
                            >
                              <div className="flex-1">
                                <DisplayType
                                  category={type.category_name}
                                  sub_category={type.sub_category_name}
                                  type={type.type_name}
                                />
                              </div>
                              <Check
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  type.type_id === field.value
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

export default FormFieldTypeCombobox;
