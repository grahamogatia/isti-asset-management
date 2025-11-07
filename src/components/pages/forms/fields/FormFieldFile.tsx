import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import type { Control } from "react-hook-form";
import { getColumnIcon } from "@/lib/columnNameUtils";
import { useMemo, useState } from "react";
import { useSettings } from "@/hooks/useSettings";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

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

  const [images, setImages] = useState<string[]>([]);
  const { data: settings } = useSettings();
  const settingsMaxImages = useMemo<number | undefined>(() => {
    const raw = settings?.find((s) => s.key === "max_images_per_item")?.value;
    if (raw === undefined || raw === null || raw === "") return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? Math.max(1, Math.floor(n)) : undefined;
  }, [settings]);

  const effectiveMax = settingsMaxImages;

  const [showLimitDialog, setShowLimitDialog] = useState(false);
  const [excessCount, setExcessCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(0);

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
                    if (selectedFiles.length === 0) return;

                    const remainingSlots = effectiveMax
                      ? Math.max(0, effectiveMax - files.length)
                      : selectedFiles.length;
                    const allowed = selectedFiles.slice(0, remainingSlots);

                    // nothing allowed -> show dialog and do nothing
                    if (allowed.length === 0) {
                      setExcessCount(selectedFiles.length);
                      setProcessedCount(0);
                      setShowLimitDialog(true);
                      return;
                    }

                    // some trimmed -> show dialog but still process allowed
                    if (allowed.length < selectedFiles.length) {
                      setExcessCount(selectedFiles.length - allowed.length);
                      setProcessedCount(allowed.length);
                      setShowLimitDialog(true);
                    } else {
                      setExcessCount(0);
                      setProcessedCount(allowed.length);
                    }

                    const newFiles = [...files, ...allowed];
                    setFiles(newFiles);
                    setImages(
                      newFiles.map((file) => URL.createObjectURL(file))
                    );
                    onChange(newFiles.map((file) => file.name));
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
                    ? `Change Files (${files.length}${
                        effectiveMax ? ` / ${effectiveMax}` : ""
                      })`
                    : placeholder}
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                {images.map((image, index) => {
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image}
                        className="max-w-20"
                        alt={`preview-${index}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-1 flex-shrink-0"
                        onClick={() => {
                          const updatedFiles = files.filter(
                            (_, i) => i !== index
                          );
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index)
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
                  );
                })}
              </div>

              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG (Max 10MB each)
              </p>
              {effectiveMax ? (
                <p className="text-xs text-gray-500">
                  {files.length} / {effectiveMax}
                </p>
              ) : null}
            </div>
          </FormControl>

          {/* Dialog: inform user when selection exceeded limit from settings */}
          <Dialog open={showLimitDialog} onOpenChange={setShowLimitDialog}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload Limit: {effectiveMax} Images
                </DialogTitle>
                <DialogDescription>
                  {effectiveMax
                    ? processedCount > 0
                      ? `Only ${processedCount} files were accepted. ${excessCount} files were skipped to respect the upload limit (${effectiveMax}). To change this limit, update the setting.`
                      : `Upload limit reached. You can only upload up to ${effectiveMax} file(s). To change this limit, update the setting.`
                    : `Some files were not processed.`}
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setShowLimitDialog(false);
                  }}
                >
                  OK
                </Button>
                <Button
                  onClick={() => {
                    setShowLimitDialog(false);
                    window.location.href = "/settings/config";
                  }}
                >
                  Change setting
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormFieldFile;
