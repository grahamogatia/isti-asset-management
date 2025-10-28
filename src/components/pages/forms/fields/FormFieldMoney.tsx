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
import { useEffect, useState } from "react";

interface FormFieldMoneyProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
}

function formatNumber(value?: number) {
  if (value === null || value === undefined || Number.isNaN(value)) return "";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 2,
  }).format(value);
}

function toNumber(raw: string): number | undefined {
  const cleaned = raw.replace(/,/g, "").trim();
  if (cleaned === "") return undefined;
  const num = Number(cleaned);
  return Number.isNaN(num) ? undefined : num;
}

function MoneyInput({
  field,
  placeholder,
}: {
  field: { value: any; onChange: (v: any) => void; onBlur?: () => void };
  placeholder?: string;
}) {
  const [display, setDisplay] = useState<string>("");

  // Sync display when external value changes
  useEffect(() => {
    setDisplay(formatNumber(field.value));
  }, [field.value]);

  return (
    <div className="flex items-center gap-0 border rounded-md pl-2">
      <PhilippinePeso className="h-4 w-auto" />
      <Input
        value={display}
        type="text"
        inputMode="decimal"
        placeholder={placeholder}
        className="border-none pl-0.5 focus-visible:ring-0"
        onFocus={() => {
          // Show unformatted value for easier editing
          const num = toNumber(display);
          setDisplay(num !== undefined ? String(num) : "");
        }}
        onChange={(e) => {
          // Allow only digits and a single dot while typing
          const raw = e.target.value;
          const unformatted = raw.replace(/,/g, "").replace(/[^\d.]/g, "");
          const parts = unformatted.split(".");
          const safe =
            parts.length > 2 ? parts[0] + "." + parts.slice(1).join("") : unformatted;

          setDisplay(safe);
          const num = toNumber(safe);
          field.onChange(num ?? undefined);
        }}
        onBlur={() => {
          // Re-apply formatting with commas
          const num = toNumber(display);
          setDisplay(formatNumber(num));
          field.onBlur?.();
        }}
      />
    </div>
  );
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
          <FormLabel>
            <IconComponent className="h-4 w-4" />
            {label}
          </FormLabel>
          <FormControl>
            <MoneyInput field={field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldMoney;