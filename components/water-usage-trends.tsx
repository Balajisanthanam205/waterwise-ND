"use client"

import { useTheme } from "next-themes"
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyData = [
  { month: "Jan", usage: 4200, average: 4500 },
  { month: "Feb", usage: 4000, average: 4300 },
  { month: "Mar", usage: 4100, average: 4200 },
  { month: "Apr", usage: 3900, average: 4100 },
  { month: "May", usage: 3800, average: 4000 },
  { month: "Jun", usage: 3700, average: 3900 },
  { month: "Jul", usage: 3900, average: 4000 },
  { month: "Aug", usage: 3600, average: 3800 },
  { month: "Sep", usage: 3500, average: 3700 },
  { month: "Oct", usage: 3400, average: 3600 },
  { month: "Nov", usage: 3300, average: 3500 },
  { month: "Dec", usage: 3200, average: 3400 },
]

const hourlyData = [
  { hour: "12 AM", usage: 5 },
  { hour: "2 AM", usage: 3 },
  { hour: "4 AM", usage: 2 },
  { hour: "6 AM", usage: 8 },
  { hour: "8 AM", usage: 15 },
  { hour: "10 AM", usage: 12 },
  { hour: "12 PM", usage: 10 },
  { hour: "2 PM", usage: 8 },
  { hour: "4 PM", usage: 12 },
  { hour: "6 PM", usage: 18 },
  { hour: "8 PM", usage: 14 },
  { hour: "10 PM", usage: 8 },
]

export function WaterUsageTrends() {
  const { theme } = useTheme()

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Monthly Usage Trend</CardTitle>
          <CardDescription>Your water usage compared to average households</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" data={monthlyData}>
            <LineChart>
              <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
                tickFormatter={(value) => `${value}L`}
              />
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <Line type="monotone" dataKey="usage" stroke="#3b82f6" strokeWidth={2} dot={false} name="Your Usage" />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#94a3b8"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name="Average"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className={theme === "dark" ? "bg-slate-800 border-slate-700" : ""}
                    label={(data) => data.month}
                    content={(data) => [
                      { name: "Your Usage", value: `${data.usage}L` },
                      { name: "Average", value: `${data.average}L` },
                    ]}
                  />
                }
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daily Usage Pattern</CardTitle>
          <CardDescription>Water consumption throughout the day</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]" data={hourlyData}>
            <AreaChart>
              <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={10} className="text-xs" />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                className="text-xs"
                tickFormatter={(value) => `${value}L`}
              />
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <Area type="monotone" dataKey="usage" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Usage" />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className={theme === "dark" ? "bg-slate-800 border-slate-700" : ""}
                    label={(data) => data.hour}
                    content={(data) => [{ name: "Usage", value: `${data.usage}L` }]}
                  />
                }
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}
