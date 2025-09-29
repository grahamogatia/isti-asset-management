import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { Control } from "react-hook-form";

interface FormFieldTextProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

function FormFieldText({ control, name, label, placeholder}: FormFieldTextProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type="text" placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldText;