import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X, File } from "lucide-react";
import type { Control } from "react-hook-form";
import { getColumnIcon } from "@/lib/columnNameUtils";

interface FormFieldFileProps {
  control: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  accept?: string;
  files: File[];
  setFiles: (files: File[]) => void;
}

function FormFieldFile({
  control,
  name,
  label,
  placeholder = "Choose files",
  accept = "image/*",
  files,
  setFiles,
}: FormFieldFileProps) {
  const IconComponent = getColumnIcon(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...field } }) => (
        <FormItem>
          <FormLabel className="flex items-center gap-2">
            <IconComponent className="h-4 w-4" />
            {label}
          </FormLabel>
          <FormControl>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Input
                  multiple
                  type="file"
                  accept={accept}
                  className="hidden"
                  id={`file-input-${name}`}
                  onChange={(e) => {
                    const selectedFiles = Array.from(e.target.files || []);
                    if (selectedFiles.length > 0) {
                      setFiles(selectedFiles);
                      onChange(selectedFiles.map((file) => file.name));
                    }
                  }}
                  {...field}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={() =>
                    document.getElementById(`file-input-${name}`)?.click()
                  }
                >
                  <Upload className="h-4 w-4" />
                  {files.length > 0
                    ? `Change Files (${files.length})`
                    : placeholder}
                </Button>
              </div>

              {/* Display all selected files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-md"
                    >
                      <File className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      <span className="text-sm text-gray-700 truncate flex-1">
                        {file.name}
                      </span>
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {(file.size / 1024 / 1024).toFixed(1)}MB
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 flex-shrink-0"
                        onClick={() => {
                          const updatedFiles = files.filter(
                            (_, i) => i !== index
                          );
                          setFiles(updatedFiles);
                          onChange(
                            updatedFiles.length > 0 ? updatedFiles : null
                          );

                          // Clear input if no files left
                          if (updatedFiles.length === 0) {
                            const input = document.getElementById(
                              `file-input-${name}`
                            ) as HTMLInputElement;
                            if (input) input.value = "";
                          }
                        }}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG (Max 10MB each)
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
