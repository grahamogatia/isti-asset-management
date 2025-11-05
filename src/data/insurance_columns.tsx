import type { ColumnDef } from "@tanstack/react-table";
import type { Insurance } from "./types";
import { createHeaderWithIcon } from "@/lib/columnNameUtils";
import { ButtonGroup } from "@/components/ui/button-group";
import UpdateInsuranceForm from "@/components/pages/forms/update/UpdateInsuranceForm";
import FormSheet from "@/components/layout/FormSheet";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { format } from "date-fns";
import DeleteInsuranceForm from "@/components/pages/forms/delete/DeleteInsuranceForm";
import ExpiredBadge from "@/components/ui/expired-badge";

export function useInsuranceColumns(): ColumnDef<Insurance>[] {
  const insurance_columns: ColumnDef<Insurance>[] = [
    {
      accessorKey: "insurance_name",
      header: createHeaderWithIcon("insurance_name", "Name"),
      cell: ({ row }) => {
        const name = row.original.insurance_name;
        return (
          <div className="flex items-center gap-2">
            <span className="truncate">{name}</span>
            <ExpiredBadge
              dateTo={row.original.insurance_date_to}
              showActive={false}
              className="ml-2"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "insurance_coverage",
      header: createHeaderWithIcon("insurace_coverage", "Coverage"),
    },
    {
      accessorKey: "insurance_date_from",
      header: createHeaderWithIcon("insurance_date_from", "Start Date"),
      cell: ({ row }) => {
        return format(row.original.insurance_date_from, "PP");
      },
    },
    {
      accessorKey: "insurance_date_to",
      header: createHeaderWithIcon("insurance_date_to", "End Date"),
      cell: ({ row }) => {
        return format(row.original.insurance_date_to, "PP");
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <ButtonGroup className="hidden sm:flex">
            <FormSheet
              type="Insurance"
              taskName="Update"
              button={
                <Button variant="outline">
                  <SquarePen className="h-4 w-4" />
                </Button>
              }
              form={<UpdateInsuranceForm insurance={row.original} />}
            />

            <DeleteInsuranceForm insurance={row.original} />

          </ButtonGroup>
        );
      },
    },
  ];

  return insurance_columns;
}
