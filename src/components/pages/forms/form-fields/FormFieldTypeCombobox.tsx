import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
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
  form
}: FormFieldTypeComboboxProps) {
  const IconComponent = getColumnIcon(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <IconComponent className="h-4 w-4" />
            {label}
          </FormLabel>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn(
                      "justify-between w-full",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value 
                    ? assetTypes.find(
                      (type) => type.type_id === field.value
                    )?.type_name
                  : "Select type"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                    placeholder="Search type..."
                    className="h-9"/>
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        {assetTypes.map((type) => (
                          <CommandItem
                          value={type.type_name}
                          key={type.type_id}
                          onSelect={() => {
                            form.setValue("type_id", type.type_id)
                            form.setValue("sub_category_id", type.sub_category_id)
                            form.setValue("category_id", type.category_id)
                          }}
                          >
                            <DisplayType category={type.category_name} sub_category={type.sub_category_name} type={type.type_name} />
                            <Check
                            className={cn(
                                "ml-auto",
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
      )}
    />
  );
}

export default FormFieldTypeCombobox;
