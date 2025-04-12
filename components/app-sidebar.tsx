"use client"

import { Bot, DropletIcon, Home, LineChart, Settings, Bell, Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export function AppSidebar() {
  const pathname = usePathname()
  const { isOpen, setIsOpen } = useSidebar()

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-md">
            <DropletIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div className={isOpen ? "block" : "hidden md:block"}>
            <h2 className="text-lg font-bold">WaterSense</h2>
            <p className="text-xs text-muted-foreground">Smart Water Management</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/dashboard")}>
              <Link href="/dashboard">
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/chatbot")}>
              <Link href="/chatbot">
                <Bot className="h-5 w-5" />
                <span>AI Assistant</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/reports")}>
              <Link href="/reports">
                <LineChart className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/settings")}>
              <Link href="/settings">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={isActive("/notifications")}>
              <Link href="/notifications">
                <Bell className="h-5 w-5" />
                <span>Notifications</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className={`text-xs text-muted-foreground ${isOpen ? "block" : "hidden md:block"}`}>
            <p>© 2025 WaterSense</p>
            <p>v1.0.0</p>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
