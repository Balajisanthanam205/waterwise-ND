"use client"

import { useState } from "react"
import { Download, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePickerWithRange } from "@/components/date-range-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { WaterUsageChart } from "@/components/water-usage-chart"
import { WaterUsageByLocationChart } from "@/components/water-usage-by-location-chart"
import { WaterUsageTable } from "@/components/water-usage-table"
import { WaterUsageTrends } from "@/components/water-usage-trends"

export default function ReportsPage() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Water Usage Reports</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <Tabs defaultValue="usage" className="w-full md:w-auto">
          <TabsList>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-2 md:space-y-0">
          <DatePickerWithRange />
          <Select defaultValue={timeRange} onValueChange={(value) => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="usage">
        <TabsContent value="usage" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Water Usage Over Time</CardTitle>
                <CardDescription>
                  Your water consumption for the past{" "}
                  {timeRange === "24h"
                    ? "24 hours"
                    : timeRange === "7d"
                      ? "7 days"
                      : timeRange === "30d"
                        ? "30 days"
                        : "90 days"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <WaterUsageChart timeRange={timeRange} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Usage by Location</CardTitle>
                <CardDescription>Distribution of water usage across different areas</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterUsageByLocationChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Usage</CardTitle>
                <CardDescription>Comparison between recommended and actual usage</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterUsageTable showAllData />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Comparison</CardTitle>
              <CardDescription>Compare your water usage with similar households</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Comparison chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage Trends</CardTitle>
              <CardDescription>Analysis of your water usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <WaterUsageTrends />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="savings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Savings</CardTitle>
              <CardDescription>Track your water conservation progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Savings chart will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
