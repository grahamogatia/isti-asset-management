import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Control } from "react-hook-form";


interface FormFieldSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder ?: string;
  children?: React.ReactNode;
}

function FormFieldSelect({control, name, label, placeholder, children}: FormFieldSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {children}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldSelect;
