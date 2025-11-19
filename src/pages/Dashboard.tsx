import AssetListCard from "@/components/pages/dashboard/AssetListCard";
import SectionCard from "@/components/pages/dashboard/SectionCards";
import { Badge } from "@/components/ui/badge";
import { ChartBar } from "@/components/ui/chart-bar";
import ChartPieConditions from "@/components/ui/chart-pie-conditions";
import ChartLineRepairsPerMonth from "@/components/ui/line-chart-repairs";
import { TableCell, TableRow } from "@/components/ui/table";
import type { CompanyAssetCount, Employee } from "@/data/types";
import { useAssets } from "@/hooks/useAsset";
import { useBorrows } from "@/hooks/useBorrow";
import { useIssuances } from "@/hooks/useIssuance";
import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useRepairs } from "@/hooks/useRepair";
import { differenceInDays } from "date-fns";

/**
 * Simple inline ChartBar component to accept the expected props from the Dashboard usage.
 * This replaces the lucide-react ChartBar icon (which is an SVG icon and doesn't accept
 * chart props like `data`, `xKey`, `yKey`, etc.).
 */

function Dashboard() {
  const { data: assets } = useAssets();
  const { data: issuances } = useIssuances(); // not deleted and pulled out
  const { data: borrows } = useBorrows(); // not deleted do not include returned
  const { data: repairs } = useRepairs(); // status is under repair
  const {
    getStatusIdGivenStatusName,
    getAsset,
    getUrgencyId,
    getEmployee,
    getCompanyName,
  } = useLookupFunctions();

  const AvailableStatusId = getStatusIdGivenStatusName(
    "Asset Inventory",
    "Available"
  );
  const DeletedStatusId = getStatusIdGivenStatusName(
    "Asset Inventory",
    "Deleted"
  );
  const UnderRepairStatusId = getStatusIdGivenStatusName(
    "Repair",
    "Under Repair"
  );
  const PulledOutStatusId = getStatusIdGivenStatusName(
    "Issuance",
    "Pulled Out"
  );

  /* METRICS */
  const totalAssets = assets
    ? assets.filter((a) => a.status_id !== DeletedStatusId).length
    : 0;
  const availableAssets = assets
    ? assets.filter((a) => a.status_id === AvailableStatusId).length
    : 0;
  const issuedAssets = issuances
    ? issuances.filter(
        (i) =>
          i.status_id !== DeletedStatusId && i.status_id !== PulledOutStatusId
      )
    : [];
  const borrowedAssets = borrows
    ? borrows.filter((b) => b.return_date == null)
    : [];
  const underRepairAssets = repairs
    ? repairs.filter((r) => r.status_id === UnderRepairStatusId)
    : [];

  /* LISTS */
  const overdueBorrows = borrowedAssets?.filter((b) => {
    const result = differenceInDays(b.due_date as Date, new Date());
    return result <= 0;
  });

  const criticalUnderRepairs = underRepairAssets?.filter(
    (r) => r.urgency_id === getUrgencyId("Critical")
  );

  /* BARS */
  const companyBorrows: CompanyAssetCount[] = (() => {
    const m = new Map<string, number>();

    (borrowedAssets ?? []).forEach((b) => {
      const emp = getEmployee(b.user_id) as Employee;

      const companyName =
        (emp?.company_id && getCompanyName(emp.company_id)) ||
        "Unknown Company";

      m.set(companyName, (m.get(companyName) ?? 0) + 1);
    });

    return Array.from(m.entries())
      .map(([company_name, count]) => ({ company_name, count }))
      .sort((a, b) => b.count - a.count);
  })();

  const companyIssuances: CompanyAssetCount[] = (() => {
    const m = new Map<string, number>();

    (issuedAssets ?? []).forEach((b) => {
      const emp = getEmployee(b.user_id) as Employee;

      const companyName =
        (emp?.company_id && getCompanyName(emp.company_id)) ||
        "Unknown Company";

      m.set(companyName, (m.get(companyName) ?? 0) + 1);
    });

    return Array.from(m.entries())
      .map(([company_name, count]) => ({ company_name, count }))
      .sort((a, b) => b.count - a.count);
  })();

  // PIE CHART

  return (
    // title, value, description, percent, trendUp
    <div className="px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <SectionCard
          title="Total Assets"
          value={totalAssets}
          desc="All tracked assets"
        />
        <SectionCard
          title="Available"
          value={availableAssets}
          desc="Ready for assignment"
        />
        <SectionCard
          title="Under Repair"
          value={underRepairAssets ? underRepairAssets.length : 0}
          desc="Assets in repair"
        />
        <SectionCard
          title="Borrowed"
          value={borrowedAssets ? borrowedAssets.length : 0}
          desc="Currently borrowed"
        />
        <SectionCard
          title="Issued"
          value={issuedAssets ? issuedAssets.length : 0}
          desc="Currently issued"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AssetListCard
          title="Critical Repairs"
          itemsTotal={criticalUnderRepairs.length}
          itemsTotalColsSpan={2}
        >
          {criticalUnderRepairs.length > 0 ? (
            criticalUnderRepairs.map((r) => {
              const asset = getAsset(r.asset_id);
              const employee = getEmployee(r.user_id);
              return (
                <TableRow key={r.repair_request_id}>
                  <TableCell>{asset?.asset_name ?? "—"}</TableCell>
                  <TableCell>{employee?.name ?? "—"}</TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="text-center">No Assets Found</TableCell>
            </TableRow>
          )}
        </AssetListCard>
        <AssetListCard
          title="Overdue Borrows"
          itemsTotal={overdueBorrows.length}
          itemsTotalColsSpan={3}
        >
          {overdueBorrows.length > 0 ? (
            overdueBorrows.map((b) => {
              const asset = getAsset(b.asset_id);
              const employee = getEmployee(b.user_id);
              return (
                <TableRow key={b.borrow_transaction_id}>
                  <TableCell>{asset?.asset_name ?? "—"}</TableCell>
                  <TableCell>{employee?.name ?? "—"}</TableCell>
                  <TableCell>
                    <Badge className="bg-[#581c87]">
                      {differenceInDays(new Date(), new Date(b.due_date))} days
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell className="text-center">No Assets Found</TableCell>
            </TableRow>
          )}
        </AssetListCard>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartBar
          chartData={companyBorrows}
          title="Company Borrows"
          description="Companies with most active borrows"
        />
        <ChartBar
          chartData={companyIssuances}
          title="Company Issuances"
          description="Companies with most active issuance"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <ChartPieConditions />
        <ChartLineRepairsPerMonth />
      </div>
    </div>
  );
}

export default Dashboard;
