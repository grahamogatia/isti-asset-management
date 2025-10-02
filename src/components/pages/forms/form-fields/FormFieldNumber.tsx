import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getColumnIcon } from "@/lib/columnNameUtils";
import type { Control } from "react-hook-form";

interface FormFieldNumberProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

function FormFieldNumber({
  control,
  name,
  label,
  placeholder,
}: FormFieldNumberProps) {
  const IconComponent = getColumnIcon(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel><IconComponent className="h-4 w-4"/>{label}</FormLabel>
          <FormControl>
              <Input
                {...field}
                type="number"
                min="0"
                onChange={(event) => {
                  return field.onChange(Number(event.target.value));
                }}
                placeholder={placeholder}
              />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldNumber;
