import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_COOKIE_NAME = "admin_session"
const ADMIN_SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export function setAdminSession() {
  const cookieStore = cookies()

  cookieStore.set({
    name: ADMIN_COOKIE_NAME,
    value: "authenticated",
    expires: Date.now() + ADMIN_SESSION_DURATION,
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  })
}

export function clearAdminSession() {
  const cookieStore = cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}

export function isAdminAuthenticated() {
  const cookieStore = cookies()
  return cookieStore.has(ADMIN_COOKIE_NAME)
}

export function requireAdmin() {
  if (!isAdminAuthenticated()) {
    redirect("/ubermensch")
  }
}

