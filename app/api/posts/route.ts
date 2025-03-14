import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
export const dynamic = "force-dynamic"
export async function GET() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  // Check if admin is authenticated
  const isAuthenticated = cookies().has("admin_session")

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const json = await request.json()
    const { title, content, mediaUrl, mediaType } = json

    const post = await db.post.create({
      data: {
        title,
        content,
        mediaUrl,
        mediaType,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}

