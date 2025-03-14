import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import { cookies } from "next/headers"

export default function AdminPage() {
  // Check if admin is authenticated
  const isAuthenticated = cookies().has("admin_session")

  if (!isAuthenticated) {
    redirect("/ubermensch")
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 border-b pb-4">Admin Dashboard</h1>
      <AdminDashboard />
    </main>
  )
}

