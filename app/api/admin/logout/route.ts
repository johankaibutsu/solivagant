import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const ADMIN_COOKIE_NAME = "admin_session"

export async function POST() {
  cookies().delete(ADMIN_COOKIE_NAME)
  return NextResponse.json({ success: true })
}

