"use client"

import { useTheme } from "next-themes"
import { BarChart, Bar, XAxis, YAxis, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { location: "Kitchen", usage: 35 },
  { location: "Bathroom", usage: 38 },
  { location: "Garden", usage: 52 },
  { location: "Laundry", usage: 25 },
]

export function WaterUsageByLocationChart() {
  const { theme } = useTheme()

  return (
    <ChartContainer className="h-[300px] w-full" data={data}>
      <BarChart>
        <XAxis dataKey="location" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          className="text-xs"
          tickFormatter={(value) => `${value}L`}
        />
        <Bar dataKey="usage" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className={theme === "dark" ? "bg-slate-800 border-slate-700" : ""}
              label={(data) => data.location}
              content={(data) => `${data.usage}L`}
            />
          }
        />
      </BarChart>
    </ChartContainer>
  )
}
