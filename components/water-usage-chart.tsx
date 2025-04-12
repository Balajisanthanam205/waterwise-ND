"use client"

import { useTheme } from "next-themes"
import { ChartContainer, ChartTooltip, ChartTooltipContent, Line, LineChart, XAxis, YAxis } from "@/components/ui/chart"

type WaterUsageChartProps = {
  timeRange: string
}

export function WaterUsageChart({ timeRange }: WaterUsageChartProps) {
  const { theme } = useTheme()

  // Generate data based on time range
  const generateData = () => {
    const data = []

    if (timeRange === "24h") {
      // Hourly data for 24 hours
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i}:00`,
          usage: Math.floor(Math.random() * 10) + 1,
        })
      }
    } else if (timeRange === "7d") {
      // Daily data for 7 days
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
      for (let i = 0; i < 7; i++) {
        data.push({
          time: days[i],
          usage: Math.floor(Math.random() * 30) + 30,
        })
      }
    } else if (timeRange === "30d") {
      // Data for 30 days
      for (let i = 1; i <= 30; i++) {
        data.push({
          time: `Day ${i}`,
          usage: Math.floor(Math.random() * 40) + 30,
        })
      }
    } else {
      // Data for 90 days (grouped by weeks)
      for (let i = 1; i <= 13; i++) {
        data.push({
          time: `Week ${i}`,
          usage: Math.floor(Math.random() * 50) + 200,
        })
      }
    }

    return data
  }

  const data = generateData()

  return (
    <ChartContainer className="h-[300px] w-full" data={data}>
      <LineChart>
        <XAxis dataKey="time" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          className="text-xs"
          tickFormatter={(value) => `${value}L`}
        />
        <Line dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 6, fill: "#3b82f6" }} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className={theme === "dark" ? "bg-slate-800 border-slate-700" : ""}
              label={(data) => data.time}
              content={(data) => `${data.usage}L`}
            />
          }
        />
      </LineChart>
    </ChartContainer>
  )
}
