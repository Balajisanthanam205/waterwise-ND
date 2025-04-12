import { getSupabaseClient } from "@/lib/supabase/client"

export type ESP32Data = {
  device_id: string
  tank_id?: string
  tap_id?: string
  water_level?: number
  flow_rate?: number
  temperature?: number
  timestamp: string
}

export async function processESP32Data(data: ESP32Data) {
  const supabase = getSupabaseClient()

  try {
    // Process tank water level data
    if (data.tank_id && data.water_level !== undefined) {
      // Update tank water level
      const { error: tankError } = await supabase
        .from("tanks")
        .update({ current_level: data.water_level, updated_at: new Date().toISOString() })
        .eq("id", data.tank_id)

      if (tankError) {
        console.error("Error updating tank level:", tankError)
        return { success: false, error: tankError.message }
      }
    }

    // Process tap water usage data
    if (data.tap_id && data.flow_rate !== undefined) {
      // Calculate water usage from flow rate (liters per minute)
      // Assuming the data is sent every minute, adjust calculation if different
      const usageAmount = data.flow_rate

      // Get user_id from tap
      const { data: tapData, error: tapError } = await supabase
        .from("taps")
        .select("user_id")
        .eq("id", data.tap_id)
        .single()

      if (tapError) {
        console.error("Error fetching tap data:", tapError)
        return { success: false, error: tapError.message }
      }

      // Insert water usage record
      const { error: usageError } = await supabase.from("water_usage_records").insert({
        user_id: tapData.user_id,
        tap_id: data.tap_id,
        usage_amount: usageAmount,
        timestamp: data.timestamp,
      })

      if (usageError) {
        console.error("Error inserting water usage record:", usageError)
        return { success: false, error: usageError.message }
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error processing ESP32 data:", error)
    return { success: false, error: String(error) }
  }
}

export async function getLatestTankLevels(userId: string) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase.from("tanks").select("*").eq("user_id", userId)

    if (error) {
      console.error("Error fetching tank levels:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting tank levels:", error)
    return { success: false, error: String(error) }
  }
}

export async function getWaterUsageByDate(userId: string, startDate: string, endDate: string) {
  const supabase = getSupabaseClient()

  try {
    const { data, error } = await supabase
      .from("water_usage_records")
      .select("*")
      .eq("user_id", userId)
      .gte("timestamp", startDate)
      .lte("timestamp", endDate)
      .order("timestamp", { ascending: true })

    if (error) {
      console.error("Error fetching water usage:", error)
      return { success: false, error: error.message }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Error getting water usage:", error)
    return { success: false, error: String(error) }
  }
}
