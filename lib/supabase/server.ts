import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"

export const createServerClient = () => {
  const cookieStore = cookies()

  return createClient(process.env.SUPABASE_URL as string, process.env.SUPABASE_ANON_KEY as string, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}
