import { IssuanceSchema } from "@/data/schemas";
import type { Issuance } from "@/data/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import FormCardContent from "@/components/layout/FormCardContent";
import { employees } from "@/testcases/foreignkeys";
import FormFieldUserCombobox from "../fields/FormFieldUserCombobox";
import FormFieldAssetCombobox from "../fields/FormFieldAssetCombobox";
import { useAddIssuance, useIssuedAssetIds } from "@/hooks/useIssuance";
import { useAssets } from "@/hooks/useAsset";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { format } from "date-fns";

function IssuanceForm() {
  const form = useForm<Issuance>({
    resolver: zodResolver(IssuanceSchema),
    defaultValues: {
      asset_id: undefined,
      category_id: undefined,
      user_id: undefined,
      department_id: undefined,
      issuance_date: undefined,
      pullout_date: undefined,
      status_id: undefined,
      remarks: undefined,
      issuance_id: undefined,
      sub_category_id: undefined,
      type_id: undefined,
      company_id: undefined,
    },
    mode: "all",
  });
  const { mutate } = useAddIssuance();
  const { data: assets } = useAssets();
  const issuedAssetIds = useIssuedAssetIds();
  const { getCategoryName, getStatuses, getStatusName } = useLookupFunctions();

  // Issuable assets must be: (Not yet issued || Status is "Pulled Out") && Internal
  const statuses = getStatuses("Issuance");
  const issuableAssets =
    (assets ?? []).filter((a) => {
      console.log("Asset: ", a.asset_name);
      const notIssued = !issuedAssetIds.includes(a.asset_id as number);
      const isPulledOut = a.status_id === statuses.find(s => s.status_name === "Pulled Out")?.status_id;
      console.log(getStatusName(a.status_id as number))
      const isInternal = a.category_id ? getCategoryName(a.category_id) : "";
      return (notIssued || isPulledOut) && isInternal;
    }) ?? [];


  // Set status to Issued
  function onSubmit(values: Issuance) {
    console.log("🎉 SUCCESS! Form submitted:", values);

    mutate(
      {
        ...values,
        status_id: statuses.find(s => s.status_name === "Issued")?.status_id,
        issuance_date: format(new Date(), "yyyy-MM-dd"),
      }
    )
  }

  return (
    <Form {...form}>
      <form
        id="issuance-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormCardContent title="Asset Details">
          <FormFieldAssetCombobox
            control={form.control}
            name="asset_id"
            label="Asset to Issue"
            assets={issuableAssets}
            form={{...form}}
          />
        </FormCardContent>
        <FormCardContent title="Recipient Information">
          <FormFieldUserCombobox
            control={form.control}
            name="user_id"
            label="Issue To"
            employees={employees}
            form={{...form}}
          />
        </FormCardContent>
        <div className="pb-6">
          <Button
            className="w-full flex items-center justify-center rounded-md"
            type="submit"
            form="issuance-form"
            // onClick={() =>
            //   console.log("Issuance form values:", form.getValues())
            // }
          >
            <Plus />
            Create Issuance Request
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default IssuanceForm;