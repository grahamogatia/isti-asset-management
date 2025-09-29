import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import type { Control } from "react-hook-form";

interface FormFieldTextAreaProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

function FormFieldTextArea({ control, name, label, placeholder}: FormFieldTextAreaProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className="resize-none" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldTextArea;