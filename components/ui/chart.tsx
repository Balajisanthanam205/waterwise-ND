"use client"

import * as React from "react"
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  ComposedChart as RechartsComposedChart,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  RadialBar,
  RadialBarChart as RechartsRadialBarChart,
  ResponsiveContainer,
  Scatter,
  ScatterChart as RechartsScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { cn } from "@/lib/utils"

const ChartContext = React.createContext<{
  data: any[]
}>({
  data: [],
})

export function ChartContainer({
  data,
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  data: any[]
}) {
  return (
    <ChartContext.Provider value={{ data }}>
      <div className={cn("h-80", className)} {...props}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

export function useChartData() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChartData must be used within a ChartContainer")
  }
  return context
}

export function LineChart({ className, children, ...props }: React.ComponentProps<typeof RechartsLineChart>) {
  const { data } = useChartData()
  return (
    <RechartsLineChart data={data} {...props}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
      {children}
    </RechartsLineChart>
  )
}

export function AreaChart({ className, children, ...props }: React.ComponentProps<typeof RechartsAreaChart>) {
  const { data } = useChartData()
  return (
    <RechartsAreaChart data={data} {...props}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
      {children}
    </RechartsAreaChart>
  )
}

export function BarChart({ className, children, ...props }: React.ComponentProps<typeof RechartsBarChart>) {
  const { data } = useChartData()
  return (
    <RechartsBarChart data={data} {...props}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
      {children}
    </RechartsBarChart>
  )
}

export function PieChart({ className, children, ...props }: React.ComponentProps<typeof RechartsPieChart>) {
  return <RechartsPieChart {...props}>{children}</RechartsPieChart>
}

export function ScatterChart({ className, children, ...props }: React.ComponentProps<typeof RechartsScatterChart>) {
  const { data } = useChartData()
  return (
    <RechartsScatterChart data={data} {...props}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
      {children}
    </RechartsScatterChart>
  )
}

export function ComposedChart({ className, children, ...props }: React.ComponentProps<typeof RechartsComposedChart>) {
  const { data } = useChartData()
  return (
    <RechartsComposedChart data={data} {...props}>
      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
      {children}
    </RechartsComposedChart>
  )
}

export function RadialBarChart({ className, children, ...props }: React.ComponentProps<typeof RechartsRadialBarChart>) {
  const { data } = useChartData()
  return (
    <RechartsRadialBarChart data={data} {...props}>
      {children}
    </RechartsRadialBarChart>
  )
}

export { Area, Bar, Cell, Legend, Line, Pie, RadialBar, Scatter, Tooltip as ChartTooltip, XAxis, YAxis }

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: (data: any) => string
  content?: (data: any) => string
}

export function ChartTooltipContent({ className, label, content, ...props }: ChartTooltipContentProps) {
  return (
    <div className={cn("rounded-lg border bg-background px-3 py-2 text-sm shadow-sm", className)} {...props}>
      {({ payload, label: defaultLabel }) => {
        if (!payload || !payload.length) {
          return null
        }

        const data = payload[0].payload

        return (
          <div className="flex flex-col gap-1">
            <div className="text-xs text-muted-foreground">{label ? label(data) : defaultLabel}</div>
            <div className="font-medium">{content ? content(data) : payload[0].value}</div>
          </div>
        )
      }}
    </div>
  )
}
