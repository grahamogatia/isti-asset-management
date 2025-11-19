import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis } from "recharts"
import { startOfYear, addMonths, getYear, format } from "date-fns"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useRepairs } from "@/hooks/useRepair"
import { useLookupFunctions } from "@/hooks/useLookupFunctions"
import { useMemo } from "react"

export const description = "Repairs per month (current year)"

const chartConfig = {
  total: {
    label: "Repairs",
    color: "var(--chart-2)",
  },
  month: {
    label: "Month",
  },
} satisfies ChartConfig

const dotColors = [
  "#6b21a8", // purple-800
  "#7c3aed", // purple-600
  "#8b5cf6", // purple-500
]

export default function ChartLineRepairsPerMonth() {
  const { data: repairs } = useRepairs()
  const { getStatusIdGivenStatusName } = useLookupFunctions()

  // prefer a "Deleted" lookup under "Repair", fall back to undefined
  const DeletedRepairStatusId = getStatusIdGivenStatusName("Repair", "Deleted")

  const chartData = useMemo(() => {
    const now = new Date()
    const year = getYear(now)
    const start = startOfYear(now)

    // prepare months from Jan .. current month
    const months: { date: Date; label: string; total: number }[] = []
    for (let i = 0; ; i++) {
      const d = addMonths(start, i)
      if (getYear(d) !== year) break
      months.push({ date: d, label: format(d, "MMM"), total: 0 })
      // stop after current month
      if (d.getMonth() === now.getMonth()) break
    }

    // helper to parse candidate date fields
    const parseRepairDate = (r: any): Date | null => {
      // common fields to try
      const candidates = [
        r.repair_date,
        r.request_date,
        r.reported_at,
        r.created_at,
        r.date_reported,
      ]
      for (const c of candidates) {
        if (!c) continue
        const dt = typeof c === "string" ? new Date(c) : c
        if (!Number.isNaN(dt.getTime())) return dt
      }
      return null
    }

    ;(repairs ?? []).forEach((r: any) => {
      // skip deleted repairs if lookup provided an id
      if (DeletedRepairStatusId != null && r.status_id === DeletedRepairStatusId) return

      const dt = parseRepairDate(r)
      if (!dt) return
      if (getYear(dt) !== year) return

      const idx = months.findIndex((m) => m.date.getMonth() === dt.getMonth())
      if (idx >= 0) months[idx].total += 1
    })

    // map to recharts friendly shape and add fill per month (for colored dots)
    return months.map((m, idx) => ({
      month: m.label,
      total: m.total,
      fill: dotColors[idx % dotColors.length],
    }))
  }, [repairs, getStatusIdGivenStatusName, DeletedRepairStatusId])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Repairs per Month</CardTitle>
        <CardDescription>From January to present (current year)</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 16,
              left: 8,
              right: 8,
              bottom: 8,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent indicator="line" nameKey="total" hideLabel={false} />
              }
            />
            <Line
              dataKey="total"
              type="natural"
              stroke="#7C3AED"
              strokeWidth={2}
              dot={({ payload, ...props }: any) => {
                return (
                  <Dot
                    key={payload.month}
                    r={5}
                    cx={props.cx}
                    cy={props.cy}
                    fill={payload.fill}
                    stroke={payload.fill}
                  />
                )
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="text-muted-foreground leading-none">
          Showing repair counts per month for the current year
        </div>
      </CardFooter>
    </Card>
  )
}