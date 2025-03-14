import { db } from "@/lib/db"
import BlogPost from "./blog-post"
export default async function BlogPosts() {
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  if (posts.length === 0) {
    return <div className="text-center py-10 text-muted-foreground">No blog posts yet.</div>
  }

  return (
    <div className="space-y-10">
      {posts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  )
}

