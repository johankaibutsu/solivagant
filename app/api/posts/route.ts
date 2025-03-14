import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const posts = await db.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(posts, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate" },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const isAuthenticated = cookies().has("admin_session");

  if (!isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const { title, content, mediaUrl, mediaType } = json;

    const post = await db.post.create({
      data: {
        title,
        content,
        mediaUrl,
        mediaType,
      },
    });

    revalidatePath("/");
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
