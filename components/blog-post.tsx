"use client"

import { useState } from "react"
import { formatDate } from "@/lib/utils"
import type { Post } from "@prisma/client"
import { motion, AnimatePresence } from "framer-motion"
import MediaEmbed from "./media-embed"

interface BlogPostProps {
  post: Post
}

export default function BlogPost({ post }: BlogPostProps) {
  const [isMediaOpen, setIsMediaOpen] = useState(false)

  return (
    <article className="border-b pb-8">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold">{post.title}</h2>
        <time className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</time>
      </div>

      <div
        className="prose prose-neutral dark:prose-invert max-w-none mb-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
        onClick={() => post.mediaUrl && setIsMediaOpen(!isMediaOpen)}
      />

      {post.mediaUrl && (
        <div className="mt-4">
          <button
            onClick={() => setIsMediaOpen(!isMediaOpen)}
            className="text-sm underline text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMediaOpen ? "Hide" : "Show"} media
          </button>

          <AnimatePresence>
            {isMediaOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                <MediaEmbed url={post.mediaUrl} type={post.mediaType} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </article>
  )
}

