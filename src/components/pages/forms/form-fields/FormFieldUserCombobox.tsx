import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import DisplayEmployee from "@/components/ui/display-employee";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import OrgFilter from "@/components/ui/org-filter";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Employee } from "@/data/types";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { cn } from "@/lib/utils";
import { company, departments, units } from "@/testcases/foreignkeys";
import { ChevronsUpDown } from "lucide-react";
import type { Control } from "react-hook-form";

interface FormFieldUserComboboxProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  employees: Employee[];
  form: any;
}

function FormFieldUserCombobox({
  control,
  name,
  label,
  employees,
  form
}: FormFieldUserComboboxProps) {
  const IconComponent = getColumnIcon(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedType = field.value 
          ? employees.find((employee) => employee.user_id === field.value)
          : null;

        return (
          <FormItem>
            <FormLabel className="flex items-center gap-2">
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
                        "justify-between w-full h-auto min-h-[2.5rem] px-3 py-2",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {/* <div className="flex-1 text-left">
                        {selectedType ? (
                          <DisplayType 
                            category={selectedType.category_name} 
                            sub_category={selectedType.sub_category_name} 
                            type={selectedType.type_name} 
                          />
                        ) : (
                          <span className="text-muted-foreground">Select type</span>
                        )}
                      </div> */}
                      <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50 flex-shrink-0" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0"> {/* Increased width for better display */}
                  <Command>
                    <CommandInput
                      placeholder="Search type..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        <OrgFilter 
                        companies={company}
                        departments={departments}
                        units={units}
                        onChange={(selection) => {
                            console.log("Filter changed: ", selection)
                        }}
                        />
                        {employees.map((employee) => (
                          <CommandItem
                            value={employee.name}
                            key={employee.user_id}
                            onSelect={() => {
                            //   form.setValue("type_id", type.type_id);
                            //   form.setValue("sub_category_id", type.sub_category_id);
                            //   form.setValue("category_id", type.category_id);
                            }}
                            className="cursor-pointer"
                          >
                            <div className="flex-1">
                              <DisplayEmployee employee={employee}/>
                            </div>
                            {/* <Check
                              className={cn(
                                "ml-2 h-4 w-4",
                                type.type_id === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            /> */}
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

export default FormFieldUserCombobox;
