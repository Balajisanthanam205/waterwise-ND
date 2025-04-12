"use client"

import { useState, useEffect } from "react"
import { DropletIcon } from "lucide-react"

type TankLevelIndicatorProps = {
  level: number
  capacity: number
}

export function TankLevelIndicator({ level, capacity }: TankLevelIndicatorProps) {
  const [animatedLevel, setAnimatedLevel] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedLevel(level)
    }, 500)

    return () => clearTimeout(timer)
  }, [level])

  const percentage = (animatedLevel / capacity) * 100

  const getColor = () => {
    if (percentage <= 20) return "bg-red-500"
    if (percentage <= 40) return "bg-orange-500"
    if (percentage <= 60) return "bg-yellow-500"
    return "bg-blue-500"
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-64 border-2 border-gray-300 dark:border-gray-600 rounded-md overflow-hidden">
        <div
          className={`absolute bottom-0 left-0 right-0 transition-all duration-1000 ease-out ${getColor()}`}
          style={{ height: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white dark:bg-slate-900 opacity-20 animate-wave"></div>
        </div>

        {/* Level markers */}
        <div className="absolute inset-y-0 left-0 w-2 flex flex-col justify-between py-2">
          <div className="h-0.5 w-2 bg-gray-400"></div>
          <div className="h-0.5 w-2 bg-gray-400"></div>
          <div className="h-0.5 w-2 bg-gray-400"></div>
          <div className="h-0.5 w-2 bg-gray-400"></div>
          <div className="h-0.5 w-2 bg-gray-400"></div>
        </div>

        {/* Level percentages */}
        <div className="absolute inset-y-0 right-2 flex flex-col justify-between py-2 text-xs text-gray-500 dark:text-gray-400">
          <div>100%</div>
          <div>75%</div>
          <div>50%</div>
          <div>25%</div>
          <div>0%</div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center text-blue-500">
          <DropletIcon className="h-5 w-5 mr-1" />
          <span className="text-2xl font-bold">{animatedLevel}L</span>
        </div>
        <p className="text-sm text-muted-foreground">of {capacity}L capacity</p>
      </div>
    </div>
  )
}
