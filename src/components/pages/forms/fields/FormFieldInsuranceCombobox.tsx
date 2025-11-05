import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import type { Insurance } from "@/data/types";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import type { Control } from "react-hook-form";
import { InsuranceForm } from "../sub-forms/InsurancePopoverForm";

interface FormFieldInsuranceComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  insurances: Insurance[];
  form: any;
}

function FormFieldInsuranceCombobox({
  control,
  name,
  label,
  insurances,
  form,
}: FormFieldInsuranceComboboxProps) {
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
                      ? insurances.find(
                          (insurance) => insurance.insurance_id === field.value
                        )?.insurance_name
                      : "Select insurance provider"}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
                <Command>
                  <CommandInput placeholder="Search type..." className="h-9" />
                  <CommandList>
                    <CommandEmpty className="flex justify-center p-4">
                      <InsuranceForm />
                    </CommandEmpty>
                    <CommandGroup>
                      {insurances.map((insurance) => (
                        <CommandItem
                          value={insurance.insurance_name}
                          key={insurance.insurance_id}
                          onSelect={() => {
                            form.setValue(
                              "insurance_id",
                              insurance.insurance_id
                            );
                          }}
                        >
                          {insurance.insurance_name}
                          <Check
                            className={cn(
                              "ml-auto",
                              insurance.insurance_id === field.value
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

export default FormFieldInsuranceCombobox;
