import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { db } from "@/lib/db"
export const dynamic = "force-dynamic";
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const post = await db.post.findUnique({
      where: {
        id: params.id,
      },
    })

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  // Check if admin is authenticated
  const isAuthenticated = cookies().has("admin_session")

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const json = await request.json()
    const { title, content, mediaUrl, mediaType } = json

    const post = await db.post.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        content,
        mediaUrl,
        mediaType,
      },
    })

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  // Check if admin is authenticated
  const isAuthenticated = cookies().has("admin_session")

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    await db.post.delete({
      where: {
        id: params.id,
      },
    })

    return NextResponse.json({ message: "Post deleted" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 })
  }
}

