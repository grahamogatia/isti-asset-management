import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import FormFieldText from "./FormFieldText";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InsuranceSchema } from "@/data/schemas";
import type { Insurance } from "@/data/types";
import FormFieldDate from "./FormFieldDate";
import FormFieldTextArea from "./FormFieldTextArea";
import { useState } from "react";

export function InsuranceForm() {
  const [open, setOpen] = useState(false);
  
  const form = useForm<Insurance>({
    resolver: zodResolver(InsuranceSchema),
    defaultValues: {
      insurance_id: 1,
      insurance_name: "",
      insurance_coverage: "",
      insurance_date_from: "",
      insurance_date_to: "",
    },
    mode: "all",
  });

  function onSubmit(values: Insurance) {
    console.log("Insurance submitted:", values);
    
    // Close the popover after successful submission
    setOpen(false);
    
    // Reset the form for next use
    form.reset();
    
    // Optional: Show success message
    // You could also add a toast notification here
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          className="hover:underline"
          onClick={() => setOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Insurance
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Insurance</h4>
            <p className="text-muted-foreground text-sm">
              Enter the insurance details below to add coverage for your assets.
            </p>
          </div>
          <div className="grid gap-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                id="insurance-form"
              >
                <FormFieldText
                  control={form.control}
                  name="insurance_name"
                  label="Name"
                  placeholder="Enter Name"
                />
                <FormFieldTextArea
                  control={form.control}
                  name="insurance_coverage"
                  label="Coverage"
                  placeholder="Enter Description"
                />
                <div className="flex w-full justify-between gap-2">
                  <FormFieldDate
                    control={form.control}
                    name="insurance_date_from"
                    label="Date From"
                    minDate={new Date("2000-01-01")}
                    maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
                  />
                  <FormFieldDate
                    control={form.control}
                    name="insurance_date_to"
                    label="Date To"
                    minDate={
                      form.watch("insurance_date_from")
                        ? new Date(form.watch("insurance_date_from"))
                        : new Date()
                    }
                    maxDate={new Date(new Date().getFullYear() + 50, 11, 31)}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 h-10 items-center rounded-md"
                    type="submit"
                    form="insurance-form"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Insurance
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