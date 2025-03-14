import { Suspense } from "react"
import BlogPosts from "@/components/blog-posts"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Suspense fallback={<BlogSkeleton />}>
        <BlogPosts />
      </Suspense>
    </main>
  )
}

function BlogSkeleton() {
  return (
    <div className="space-y-8">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="border-b pb-8">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ))}
    </div>
  )
}

