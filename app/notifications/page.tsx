"use client"

import { useState } from "react"
import { Bell, Check, DropletIcon, Info, AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"

type Notification = {
  id: string
  title: string
  message: string
  type: "info" | "warning" | "success" | "alert"
  isRead: boolean
  timestamp: string
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "Low Tank Level",
    message: "Your main water tank is below 20% capacity. Consider refilling soon.",
    type: "warning",
    isRead: false,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    title: "Unusual Water Usage",
    message: "We detected unusual water usage in your bathroom between 2 AM and 4 AM. This might indicate a leak.",
    type: "alert",
    isRead: false,
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    title: "Weekly Report Available",
    message: "Your weekly water usage report is now available. You saved 15% compared to last week!",
    type: "info",
    isRead: true,
    timestamp: "1 day ago",
  },
  {
    id: "4",
    title: "Water Saving Goal Achieved",
    message: "Congratulations! You've achieved your monthly water saving goal of 10%.",
    type: "success",
    isRead: true,
    timestamp: "3 days ago",
  },
  {
    id: "5",
    title: "New Recommendation",
    message: "Based on your usage patterns, we've added a new water saving recommendation to your dashboard.",
    type: "info",
    isRead: true,
    timestamp: "4 days ago",
  },
]

export default function NotificationsPage() {
  const [notificationsList, setNotificationsList] = useState<Notification[]>(notifications)

  const unreadCount = notificationsList.filter((notification) => !notification.isRead).length

  const markAsRead = (id: string) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "success":
        return <Check className="h-5 w-5 text-green-500" />
      case "alert":
        return <DropletIcon className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <SidebarTrigger className="md:hidden" />
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} New
            </Badge>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
          Mark all as read
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="info">Information</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {notificationsList.length === 0 ? (
            <Card>
              <CardContent className="flex h-40 items-center justify-center">
                <p className="text-muted-foreground">No notifications</p>
              </CardContent>
            </Card>
          ) : (
            notificationsList.map((notification) => (
              <Card
                key={notification.id}
                className={`transition-colors ${notification.isRead ? "" : "border-l-4 border-l-blue-500"}`}
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="flex items-start space-x-4">
                    <div className="mt-1">{getIconForType(notification.type)}</div>
                    <div>
                      <CardTitle className="text-base">{notification.title}</CardTitle>
                      <CardDescription className="mt-1">{notification.message}</CardDescription>
                    </div>
                  </div>
                  {!notification.isRead && (
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      Mark as read
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    {notification.timestamp}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4">
          {notificationsList.filter((n) => !n.isRead).length === 0 ? (
            <Card>
              <CardContent className="flex h-40 items-center justify-center">
                <p className="text-muted-foreground">No unread notifications</p>
              </CardContent>
            </Card>
          ) : (
            notificationsList
              .filter((n) => !n.isRead)
              .map((notification) => (
                <Card key={notification.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">{getIconForType(notification.type)}</div>
                      <div>
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">{notification.message}</CardDescription>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                      Mark as read
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {notification.timestamp}
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          {notificationsList.filter((n) => n.type === "alert" || n.type === "warning").length === 0 ? (
            <Card>
              <CardContent className="flex h-40 items-center justify-center">
                <p className="text-muted-foreground">No alerts</p>
              </CardContent>
            </Card>
          ) : (
            notificationsList
              .filter((n) => n.type === "alert" || n.type === "warning")
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-colors ${notification.isRead ? "" : "border-l-4 border-l-blue-500"}`}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">{getIconForType(notification.type)}</div>
                      <div>
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">{notification.message}</CardDescription>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        Mark as read
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {notification.timestamp}
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>

        <TabsContent value="info" className="space-y-4">
          {notificationsList.filter((n) => n.type === "info" || n.type === "success").length === 0 ? (
            <Card>
              <CardContent className="flex h-40 items-center justify-center">
                <p className="text-muted-foreground">No information notifications</p>
              </CardContent>
            </Card>
          ) : (
            notificationsList
              .filter((n) => n.type === "info" || n.type === "success")
              .map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-colors ${notification.isRead ? "" : "border-l-4 border-l-blue-500"}`}
                >
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="flex items-start space-x-4">
                      <div className="mt-1">{getIconForType(notification.type)}</div>
                      <div>
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        <CardDescription className="mt-1">{notification.message}</CardDescription>
                      </div>
                    </div>
                    {!notification.isRead && (
                      <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                        Mark as read
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="mr-1 h-3 w-3" />
                      {notification.timestamp}
                    </div>
                  </CardContent>
                </Card>
              ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
