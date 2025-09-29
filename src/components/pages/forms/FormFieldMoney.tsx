import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-0 border rounded-md pl-2">
              <PhilippinePeso className="h-4 w-auto"/>
              <Input type="number" min="0" step="0.01" placeholder={placeholder} className="border-none pl-0.5" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldMoney;
