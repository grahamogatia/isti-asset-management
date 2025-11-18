import { BorrowSchema } from "@/data/schemas";
import type { Borrow } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldNumber from "../fields/FormFieldNumber";
import DisplayField from "@/components/layout/DisplayField";
import DisplayAsset from "@/components/ui/display-asset";
import DisplayEmployee from "@/components/ui/display-employee";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useUpdateBorrow } from "@/hooks/useBorrow";
import { compareObjects } from "@/lib/utils";
import { toast } from "sonner";
import { employees } from "@/testcases/foreignkeys";

interface UpdateBorrowFormProps {
  borrow: Borrow;
}

function UpdateBorrowForm({ borrow }: UpdateBorrowFormProps) {
  const form = useForm<Borrow>({
    resolver: zodResolver(BorrowSchema),
    defaultValues: {
      ...borrow,
    },
    mode: "all",
  });
  
  const { mutate } = useUpdateBorrow();
  const { getAsset, getCategoryName, getSubCategoryName, getTypeName } = useLookupFunctions();
  const assetId = form.watch("asset_id");
  const asset = getAsset(assetId);
  const userId = form.watch("user_id") || borrow.user_id;
  const employee = employees.find((emp) => emp.user_id === userId);

  function onSubmit(values: Borrow) {
    const changed = compareObjects(borrow, values);

    if (Object.values(changed).length === 0) {
      toast.info("No changes detected. Please make edits to update.");
      return;
    }

    console.log(changed);
    mutate(
      {
        id: values.borrow_transaction_id as number,
        data: changed,
      },
      {
        onSuccess: () => {
          toast.success("Successfully updated borrow transaction.");
        },
      }
    );
    console.log("🎉 SUCCESS! Form submitted:", values);
  }

  return (
    <Form {...form}>
      <form
        id="update-borrow-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Details">
          <DisplayField name="asset_name" label="Asset Name">
            <DisplayAsset
              asset_name={asset?.asset_name as string}
              category={getCategoryName(asset?.category_id as number)}
              sub_category={getSubCategoryName(
                asset?.sub_category_id as number
              )}
              type={getTypeName(asset?.type_id as number)}
            />
          </DisplayField>

          <DisplayField name="user_id" label="Reported By">
            {employee ? (
              <DisplayEmployee employee={employee} />
            ) : (
              <span className="text-muted-foreground">Employee not found</span>
            )}
          </DisplayField>
        </FormCardContent>
        <FormCardContent title="Record">
          <FormFieldDate
            control={form.control}
            name="date_borrowed"
            label="Date Borrowed"
          />
          <FormFieldNumber
            control={form.control}
            name="duration"
            label="Duration (days)"
            placeholder="Enter duration in days"
          />
          <FormFieldTextArea
            control={form.control}
            name="remarks"
            label="Remarks"
            placeholder="Enter remarks"
          />
        </FormCardContent>
        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-md"
            type="submit"
            form="update-borrow-form"
          >
            <Save className="mr-2 h-4 w-4" />
            Update Borrow Details
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateBorrowForm;
