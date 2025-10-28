import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
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
            <InputGroup>
              <InputGroupTextarea
                {...field}
                placeholder={placeholder}
                rows={6}
                className="min-h-24 resize-none"
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="tabular-nums">
                  {(field.value || "").length}/255 characters{" "}
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {/* <Textarea
              placeholder={placeholder}
              className="resize-none"
              {...field}
            /> */}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldTextArea;
