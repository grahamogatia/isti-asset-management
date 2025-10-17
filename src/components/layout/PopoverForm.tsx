import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Form } from "@/components/ui/form";
import { Button } from "../ui/button";
import type { UseFormReturn, FieldValues } from "react-hook-form";
import { X } from "lucide-react";

interface PopoverFormProps<T extends FieldValues> {
  triggerButton: React.ReactNode;
  title: string;
  description?: string;
  subtitle?: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (values: T) => void;
  children: React.ReactNode;
  submitButtonText: string;
  submitButtonIcon?: React.ReactNode;
  submitButtonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  formId: string;
  onReject?: (values: T) => void;
  rejectButtonText?: string;
}

function PopoverForm<T extends FieldValues>({
  triggerButton,
  title,
  description,
  subtitle,
  form,
  onSubmit,
  children,
  submitButtonText,
  submitButtonIcon,
  submitButtonVariant = "default",
  formId,
  onReject,
  rejectButtonText = "Reject",
}: PopoverFormProps<T>) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values: T) => {
    onSubmit(values);
    setOpen(false);
    form.reset();
  };

  const handleReject = () => {
    const values = form.getValues();
    onReject?.(values);
    setOpen(false);
    form.reset();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="leading-none font-medium">{title}</h4>
                {description && (
                  <p className="text-muted-foreground text-sm mt-2">{description}</p>
                )}
                {subtitle && (
                  <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 -mt-1 -mr-2"
                onClick={() => setOpen(false)}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Form {...form}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  form.handleSubmit(handleSubmit)(e);
                }}
                className="space-y-4"
                id={formId}
              >
                {children}

                <div className="flex gap-2">
                  {onReject && (
                    <Button
                      type="button"
                      variant="destructive"
                      className="flex-1"
                      onClick={handleReject}
                    >
                      {rejectButtonText}
                    </Button>
                  )}
                  <Button
                    className="flex-1 flex items-center justify-center gap-0"
                    variant={submitButtonVariant}
                    type="submit"
                    form={formId}
                  >
                    {submitButtonIcon}
                    {submitButtonText}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PopoverForm;