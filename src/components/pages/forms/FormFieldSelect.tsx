import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getColumnIcon } from "@/lib/columnNameUtils";
import type { Control } from "react-hook-form";

interface FormFieldSelectProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  children?: React.ReactNode;
}

function FormFieldSelect({
  control,
  name,
  label,
  placeholder,
  children,
}: FormFieldSelectProps) {
  const IconComponent = getColumnIcon(name);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel><IconComponent className="h-4 w-4" />{label}</FormLabel>
          <Select onValueChange={
            (value) => {field.onChange(Number(value))}
            // field.onChange
            } defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldSelect;
