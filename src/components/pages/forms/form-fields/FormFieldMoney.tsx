import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { PhilippinePeso } from "lucide-react";
import type { Control } from "react-hook-form";

interface FormFieldMoneyProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

function FormFieldMoney({
  control,
  name,
  label,
  placeholder,
}: FormFieldMoneyProps) {
  const IconComponent = getColumnIcon(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel><IconComponent className="h-4 w-4"/>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-0 border rounded-md pl-2">
              <PhilippinePeso className="h-4 w-auto" />
              <Input
                {...field}
                type="number"
                min="0"
                onChange={(event) => {
                  return field.onChange(Number(event.target.value));
                }}
                placeholder={placeholder}
                className="border-none pl-0.5 focus-visible:ring-0"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldMoney;
