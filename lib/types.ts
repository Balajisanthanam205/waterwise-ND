export type User = {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export type Tank = {
  id: string
  user_id: string
  name: string
  height: number
  width: number
  depth: number
  floor_level: number
  capacity: number
  current_level: number
  created_at: string
  updated_at: string
}

export type Tap = {
  id: string
  user_id: string
  name: string
  location: string
  pipe_size: number
  is_monitored: boolean
  created_at: string
  updated_at: string
}

export type WaterUsageRecord = {
  id: string
  user_id: string
  tap_id: string | null
  usage_amount: number
  timestamp: string
  created_at: string
}

export type Recommendation = {
  id: string
  user_id: string
  title: string
  description: string
  impact: "High" | "Medium" | "Low"
  is_implemented: boolean
  created_at: string
  updated_at: string
}

export type NotificationSettings = {
  id: string
  user_id: string
  email_notifications: boolean
  sms_notifications: boolean
  push_notifications: boolean
  daily_summary: boolean
  weekly_summary: boolean
  monthly_summary: boolean
  overuse_threshold: number
  leak_detection: boolean
  tank_level_alerts: boolean
  tank_level_threshold: number
  created_at: string
  updated_at: string
}

export type RecommendedUsage = {
  id: string
  location: string
  recommended_amount: number
  created_at: string
  updated_at: string
}

export type UsageComparison = {
  location: string
  recommended: number
  actual: number
  status: "Good" | "Overused" | "Underused"
}
