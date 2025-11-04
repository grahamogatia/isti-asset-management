import { BorrowSchema } from "@/data/schemas";
import type { Borrow } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import FormFieldTextArea from "../fields/FormFieldTextArea";
import FormFieldDate from "../fields/FormFieldDate";
import FormFieldNumber from "../fields/FormFieldNumber";
import FormFieldAssetCombobox from "../fields/FormFieldAssetCombobox";
import FormFieldUserCombobox from "../fields/FormFieldUserCombobox";
import { employees } from "@/testcases/foreignkeys";
import { useAssets } from "@/hooks/useAsset";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useMemo } from "react";
import { useAddBorrow, useBorrows } from "@/hooks/useBorrow";
import { addMonths, format } from "date-fns";

function BorrowForm() {
  const form = useForm<Borrow>({
    resolver: zodResolver(BorrowSchema),
    defaultValues: {
      asset_id: undefined,
      category_id: undefined,
      user_id: undefined,
      department_id: undefined,
      date_borrowed: new Date(),
      asset_condition_id: undefined,
      borrow_transaction_id: undefined,
      company_id: undefined,
      sub_category_id: undefined,
      type_id: undefined,
      due_date: undefined, // Computed
      return_date: undefined,
      duration: undefined, // Is set
      remarks: "",
    },
    mode: "all",
  });

  const { mutate } = useAddBorrow();
  const { data: assets } = useAssets();
  const { data: borrows } = useBorrows();
  const { getConditionName, getCategoryName, getStatuses, getAsset, getStatusIdGivenStatusName } =
    useLookupFunctions();

  const statuses = getStatuses("Asset Inventory"); // Since the Assets can use the Borrow Status !!!!!
  const borrowableAssets = useMemo(() => {
    if (!assets || !borrows) return [];

    const borrowedAssetIds = new Set(
      (borrows ?? [])
        .filter((b) => !b.return_date) // Currently borrowed
        .map((b) => b.asset_id)
    );

    return (assets ?? []).filter((asset) => {
      const condition = getConditionName(asset.asset_condition_id);
      const category = getCategoryName(asset.category_id);
      const isAvailable = asset.status_id === getStatusIdGivenStatusName("Asset Inventory", "Available");

      return (
        !borrowedAssetIds.has(asset.asset_id as number) && // Not currently borrowed
        (condition === "New" || condition === "Good") && isAvailable &&
        category !== "External"
      );
    });
  }, [assets, borrows]);

  function onSubmit(values: Borrow) {
    console.log("Yay")
    const dueDate =
      values.duration && values.date_borrowed
        ? addMonths(new Date(values.date_borrowed), values.duration)
        : undefined;
    const conditionId = getAsset(values.asset_id)?.asset_condition_id;

    mutate(
      {
        ...values,
        status_id: statuses.find((s) => s.status_name === "Borrowed")
          ?.status_id,
        date_borrowed: format(values.date_borrowed, "yyy-MM-dd"),
        due_date: format(dueDate as Date, "yyy-MM-dd"),
        asset_condition_id: conditionId,
      },
      {
        onSuccess: () => {
          form.reset();
        },
        onError: (error) => {
          console.error("Failed to create borrow request:", error);
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        id="borrow-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Details">
          <FormFieldAssetCombobox
            control={form.control}
            name="asset_id"
            label="Asset to Borrow"
            assets={borrowableAssets}
            form={form}
          />
          <FormFieldUserCombobox
            control={form.control}
            name="user_id"
            label="Borrowed By"
            employees={employees}
            form={form}
          />
        </FormCardContent>
        <FormCardContent title="Record">
          <FormFieldDate
            control={form.control}
            name="date_borrowed"
            label="Date Borrowed"
            maxDate={new Date()}
          />
          <FormFieldNumber
            control={form.control}
            name="duration"
            label="Duration (Months)"
            placeholder="Enter duration in Months"
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
            form="borrow-form"
            onClick={() => {
              console.log("Borrow form values:", form.getValues());
              console.log("Form values:", form.getValues());
              console.log("Form errors:", form.formState.errors);
            }}
          >
            <Plus />
            Borrow Request
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BorrowForm;
