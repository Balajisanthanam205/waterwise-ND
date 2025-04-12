import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to login page if not authenticated
  // In a real app, you would check authentication status here
  const isAuthenticated = false

  if (!isAuthenticated) {
    redirect("/auth/login")
  }

  return redirect("/dashboard")
}
