"use client"

import { useState } from "react"
import { ArrowUpDown, Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type UsageData = {
  id: string
  place: string
  recommended: number
  actual: number
  status: "Good" | "Overused" | "Underused"
}

const usageData: UsageData[] = [
  { id: "1", place: "Kitchen", recommended: 20, actual: 35, status: "Overused" },
  { id: "2", place: "Bathroom", recommended: 40, actual: 38, status: "Good" },
  { id: "3", place: "Garden", recommended: 50, actual: 52, status: "Good" },
  { id: "4", place: "Laundry", recommended: 30, actual: 25, status: "Underused" },
]

const extendedData: UsageData[] = [
  ...usageData,
  { id: "5", place: "Outdoor Tap", recommended: 15, actual: 22, status: "Overused" },
  { id: "6", place: "Dishwasher", recommended: 12, actual: 10, status: "Good" },
  { id: "7", place: "Washing Machine", recommended: 25, actual: 28, status: "Good" },
]

type WaterUsageTableProps = {
  showAllData?: boolean
}

export function WaterUsageTable({ showAllData = false }: WaterUsageTableProps) {
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const data = showAllData ? extendedData : usageData

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0

    const aValue = a[sortColumn as keyof UsageData]
    const bValue = b[sortColumn as keyof UsageData]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Good":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
            Good
          </Badge>
        )
      case "Overused":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
            Overused
          </Badge>
        )
      case "Underused":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
            Underused
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <TooltipProvider>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("place")} className="h-8 px-2 text-xs font-medium">
                  Place
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("recommended")}
                    className="h-8 px-2 text-xs font-medium"
                  >
                    Recommended Usage
                    <ArrowUpDown className="ml-2 h-3 w-3" />
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 text-muted-foreground ml-1" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="w-[200px] text-xs">
                        Recommended daily water usage based on average household consumption patterns
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("actual")} className="h-8 px-2 text-xs font-medium">
                  Actual Usage
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort("status")} className="h-8 px-2 text-xs font-medium">
                  Status
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.place}</TableCell>
                <TableCell>{row.recommended}L</TableCell>
                <TableCell>{row.actual}L</TableCell>
                <TableCell>{getStatusBadge(row.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  )
}
