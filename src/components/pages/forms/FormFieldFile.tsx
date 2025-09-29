import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, File } from "lucide-react";
import { useState } from "react";
import type { Control } from "react-hook-form";

interface FormFieldFileProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  accept?: string;
}

function FormFieldFile({ 
  control, 
  name, 
  label, 
  placeholder = "Choose a file", 
  accept = "image/*"
}: FormFieldFileProps) {
  const [fileName, setFileName] = useState<string>("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  type="file"
                  accept={accept}
                  className="hidden"
                  id={`file-input-${name}`}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFileName(file.name);
                      onChange(file);
                    }
                  }}
                  {...field}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() => document.getElementById(`file-input-${name}`)?.click()}
                >
                  <Upload className="h-4 w-4" />
                  {fileName ? "Change File" : placeholder}
                </Button>
                
                {fileName && (
                  <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md">
                    <File className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700 truncate max-w-48">
                      {fileName}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1"
                      onClick={() => {
                        setFileName("");
                        onChange(null);
                        const input = document.getElementById(`file-input-${name}`) as HTMLInputElement;
                        if (input) input.value = "";
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG (Max 10MB)
              </p>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldFile;