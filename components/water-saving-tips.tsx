import { Check, ThumbsUp } from "lucide-react"

type Tip = {
  id: string
  title: string
  description: string
  impact: "High" | "Medium" | "Low"
  isImplemented: boolean
}

const tips: Tip[] = [
  {
    id: "1",
    title: "Install Water-Efficient Showerheads",
    description: "Replace your standard showerhead with a water-efficient model to save up to 7.5 liters per minute.",
    impact: "High",
    isImplemented: false,
  },
  {
    id: "2",
    title: "Fix Leaking Taps",
    description: "A dripping tap can waste more than 20,000 liters of water per year. Fix all leaks promptly.",
    impact: "High",
    isImplemented: true,
  },
  {
    id: "3",
    title: "Collect Rainwater",
    description: "Use rain barrels to collect rainwater for garden irrigation and outdoor cleaning.",
    impact: "Medium",
    isImplemented: false,
  },
  {
    id: "4",
    title: "Shorter Showers",
    description: "Reducing your shower time by just 2 minutes can save up to 15 liters of water per shower.",
    impact: "Medium",
    isImplemented: true,
  },
  {
    id: "5",
    title: "Full Loads Only",
    description: "Only run washing machines and dishwashers with full loads to maximize water efficiency.",
    impact: "Low",
    isImplemented: false,
  },
]

export function WaterSavingTips() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "Low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="space-y-4">
      {tips.map((tip) => (
        <div
          key={tip.id}
          className={`rounded-lg border p-4 ${
            tip.isImplemented ? "border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20" : ""
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center">
                <h3 className="font-medium">{tip.title}</h3>
                {tip.isImplemented && (
                  <div className="ml-2 flex items-center text-green-600 dark:text-green-400">
                    <Check className="mr-1 h-4 w-4" />
                    <span className="text-xs">Implemented</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
            <div className={`rounded px-2 py-1 text-xs font-medium ${getImpactColor(tip.impact)}`}>
              {tip.impact} Impact
            </div>
          </div>
          {!tip.isImplemented && (
            <div className="mt-4 flex justify-end">
              <button className="flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                <ThumbsUp className="mr-1 h-3 w-3" />
                Mark as implemented
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
