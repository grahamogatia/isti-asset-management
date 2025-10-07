import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
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
  form,
}: FormFieldUserComboboxProps) {
  const IconComponent = getColumnIcon(name);
  const [displayedEmployees, setDisplayedEmployees] =
    useState<Employee[]>(employees);

  const filteredEmployees = (
    prev: Employee[],
    compId?: number | null,
    deptId?: number | null,
    unitId?: number | null
  ): Employee[] => {
    if (!compId && !deptId && !unitId) {
      return employees;
    }

    return prev.filter((employee) => {
      if (compId && employee.company_id !== compId) return false;
      if (deptId && employee.department_id !== deptId) return false;
      if (unitId && employee.unit_id !== unitId) return false;
      return true;
    });
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const selectedEmployee = field.value
          ? employees.find((employee) => employee.user_id === field.value)
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
                        {selectedEmployee ? (
                          <DisplayEmployee employee={selectedEmployee} />
                        ) : (
                          <span className="text-muted-foreground">
                            Select Employee
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
                      placeholder="Search Employee..."
                      className="h-9"
                    />
                    <CommandList>
                      <CommandEmpty>No type found.</CommandEmpty>
                      <CommandGroup>
                        <OrgFilter
                          companies={company}
                          departments={departments}
                          units={units}
                          onChange={(s) => {
                            setDisplayedEmployees((prev) =>
                              filteredEmployees(
                                prev,
                                s.companyId,
                                s.departmentId,
                                s.unitId
                              )
                            );
                          }}
                        />
                        {displayedEmployees
                          .sort((a, b) => {
                            const companyCompare = a.company_id - b.company_id;
                            if (companyCompare !== 0) return companyCompare;
                            return a.name.localeCompare(b.name);
                          })
                          .map((employee) => (
                            <CommandItem
                              value={employee.name}
                              key={employee.user_id}
                              onSelect={() => {
                                form.setValue(name, employee.user_id);
                              }}
                              className="cursor-pointer"
                            >
                              <div className="flex-1">
                                <DisplayEmployee employee={employee} />
                              </div>
                              <Check
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  employee.user_id === field.value
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

export default FormFieldUserCombobox;
