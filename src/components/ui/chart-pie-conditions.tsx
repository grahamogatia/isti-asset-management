import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useLookupFunctions } from "@/hooks/useLookupFunctions";
import { useMemo } from "react";
import { useAssets } from "@/hooks/useAsset";

type ConditionCount = { condition: string; total: number };

export const description = "Asset condition breakdown for borrowed assets";

const purpleShades = [
  "#6B21A8", // purple-800
  "#7C3AED", // purple-600
  "#8B5CF6", // purple-500
  "#A78BFA", // purple-300
  "#C4B5FD", // purple-200
  "#E9D5FF", // purple-100
];

const chartConfig = {
  total: {
    label: "Count",
  },
  condition: {
    label: "Condition",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function ChartPieConditions() {
  const { data: assets } = useAssets();
  const { getAsset, getConditionName } = useLookupFunctions();

  const assetConditions: ConditionCount[] = useMemo(() => {
    const m = new Map<string, number>();

    (assets ?? []).forEach((a) => {
      const conditionName =
        a?.asset_condition_id != null
          ? (typeof (getConditionName as any) === "function"
              ? (getConditionName as any)(a.asset_condition_id)
              : null) ?? "Unknown Condition"
          : "Unknown Condition";

      m.set(conditionName, (m.get(conditionName) ?? 0) + 1);
    });

    return Array.from(m.entries())
      .map(([condition, total]) => ({ condition, total }))
      .sort((a, b) => b.total - a.total);
  }, [assets, getAsset, getConditionName]);

  // map to recharts data with fills (cycle purple shades)
  const chartData = assetConditions.map((c, idx) => ({
    browser: c.condition,
    visitors: c.total,
    fill: purpleShades[idx % purpleShades.length],
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Assets by Condition</CardTitle>
        <CardDescription>
          Distribution asset conditions
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[260px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              stroke="0"
              innerRadius={48}
              outerRadius={90}
              paddingAngle={2}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {assetConditions.length > 0
            ? `Showing ${assetConditions.reduce(
                (s, c) => s + c.total,
                0
              )} borrowed assets`
            : "No borrowed assets"}
        </div>
      </CardFooter>
    </Card>
  );
}
