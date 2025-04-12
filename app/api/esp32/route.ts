import { type NextRequest, NextResponse } from "next/server"
import { processESP32Data, type ESP32Data } from "@/lib/esp32-service"

export async function POST(request: NextRequest) {
  try {
    const data = (await request.json()) as ESP32Data

    // Validate required fields
    if (!data.device_id || !data.timestamp) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Process the data
    const result = await processESP32Data(data)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing ESP32 data:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
