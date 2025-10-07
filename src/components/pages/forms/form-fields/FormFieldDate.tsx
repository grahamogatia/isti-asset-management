import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { Control } from "react-hook-form";
import { getColumnIcon } from "@/lib/columnNameUtils";

interface FormFieldDateProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

function FormFieldDate({
  control,
  name,
  label,
  placeholder = "Pick a date",
  minDate,
  maxDate,
}: FormFieldDateProps) {
  const IconComponent = getColumnIcon(name);

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col w-full">
          <FormLabel className="flex items-center gap-2">
            <IconComponent className="h-4 w-4" />
            {label}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal justify-between",
                    !field.value && "text-muted-foreground"
                  )}
                >
                  <span className="truncate flex-1 mr-2">
                    {field.value
                      ? format(new Date(field.value), "PP")
                      : placeholder}
                  </span>
                  <CalendarIcon className="h-4 w-4 opacity-50 flex-shrink-0" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={(date) => {
                  if (date) {
                    field.onChange(date);
                  } else {
                    field.onChange(null);
                  }
                }}
                disabled={isDateDisabled}
                captionLayout="dropdown"
                startMonth={minDate}
                endMonth={maxDate}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default FormFieldDate;
