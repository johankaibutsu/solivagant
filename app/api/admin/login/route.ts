import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_COOKIE_NAME = "admin_session"
const ADMIN_SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 days

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    // Check if credentials match the environment variables
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      // Set a cookie for the admin session
      cookies().set({
        name: ADMIN_COOKIE_NAME,
        value: "authenticated",
        expires: Date.now() + ADMIN_SESSION_DURATION,
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

