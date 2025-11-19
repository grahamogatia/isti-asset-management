// ...existing code...
import { Bar, BarChart, CartesianGrid, XAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { CompanyAssetCount } from "@/data/types";

interface ChartBarProps {
  chartData: CompanyAssetCount[];
  title: string,
  description: string;
}

const purpleShades = [
  "#6b21a8", // purple-800
  "#7c3aed", // purple-600
  "#8b5cf6", // purple-500
  "#a78bfa", // purple-300
  "#c4b5fd", // purple-200
  "#e9d5ff", // purple-100
];

export function ChartBar({ chartData, title, description }: ChartBarProps) {
  const data = chartData ?? [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={{
            count: { label: "Borrows", color: "#1e1b4b" },
          }}
        >
          <BarChart className="w-full" accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="company_name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="count" radius={8}>
              {data.map((_, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={purpleShades[idx % purpleShades.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          {description}
        </div>
      </CardFooter>
    </Card>
  );
}
// ...existing code...
