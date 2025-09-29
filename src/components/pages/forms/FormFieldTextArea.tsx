import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { getColumnIcon } from "@/lib/columnNameUtils";
import type { Control } from "react-hook-form";

interface FormFieldTextAreaProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

function FormFieldTextArea({
  control,
  name,
  label,
  placeholder,
}: FormFieldTextAreaProps) {
  const IconComponent = getColumnIcon(name);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <IconComponent className="h-4 w-4" />
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder={placeholder}
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldTextArea;
