"use client"

import { useState, useEffect } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { DropletIcon, RefreshCw } from "lucide-react"
import { WaterUsageChart } from "@/components/water-usage-chart"
import { WaterUsageByLocationChart } from "@/components/water-usage-by-location-chart"
import { WaterUsageTable } from "@/components/water-usage-table"
import { TankLevelIndicator } from "@/components/tank-level-indicator"
import { WaterSavingTips } from "@/components/water-saving-tips"
import { SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("7d")
  const [isLoading, setIsLoading] = useState(true)
  const [userName, setUserName] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseClient()

  // Mock data for tank
  const tankData = {
    level: 350,
    capacity: 500,
  }

  useEffect(() => {
    async function checkAuth() {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        router.push("/auth/login")
        return
      }

      // Fetch user profile
      const { data: userData, error } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", session.user.id)
        .single()

      if (userData) {
        setUserName(userData.full_name)
      }

      setIsLoading(false)
    }

    checkAuth()
  }, [router, supabase])

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
            <DropletIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142.8L</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Usage</CardTitle>
            <DropletIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">138.5L</div>
            <p className="text-xs text-muted-foreground">-4% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Water Saved</CardTitle>
            <DropletIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.4L</div>
            <p className="text-xs text-muted-foreground">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <DropletIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Water Usage</CardTitle>
                <CardDescription>Your water consumption for the past 7 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <WaterUsageChart timeRange={timeRange} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Tank Level</CardTitle>
                <CardDescription>Current water level in your main tank</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pt-4">
                <TankLevelIndicator level={tankData.level} capacity={tankData.capacity} />
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
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Usage Comparison</CardTitle>
                <CardDescription>Comparison between recommended and actual usage</CardDescription>
              </CardHeader>
              <CardContent>
                <WaterUsageTable />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
                <CardDescription>In-depth analysis of your water usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Detailed analytics will be displayed here
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Peak Usage Times</CardTitle>
                <CardDescription>When you use the most water</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  Peak usage chart will be displayed here
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Water Saving Tips</CardTitle>
              <CardDescription>Personalized recommendations to reduce water consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <WaterSavingTips />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
