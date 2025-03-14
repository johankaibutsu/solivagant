import BlogPosts from "@/components/blog-posts"
import { blogPosts } from "@/lib/data"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <BlogPosts posts={blogPosts} />
    </main>
  )
}

