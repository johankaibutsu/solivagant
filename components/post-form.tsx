"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Post } from "@prisma/client"

interface PostFormProps {
  post?: Post | null
  onSubmit: (data: any) => void
  onCancel: () => void
}

export default function PostForm({ post, onSubmit, onCancel }: PostFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    mediaUrl: "",
    mediaType: "youtube",
  })

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        mediaUrl: post.mediaUrl || "",
        mediaType: post.mediaType || "youtube",
      })
    }
  }, [post])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, mediaType: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="mediaUrl">Media URL (optional)</Label>
          <Input
            id="mediaUrl"
            name="mediaUrl"
            value={formData.mediaUrl}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="mediaType">Media Type</Label>
          <Select value={formData.mediaType} onValueChange={handleSelectChange}>
            <SelectTrigger id="mediaType">
              <SelectValue placeholder="Select media type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="youtube">YouTube</SelectItem>
              <SelectItem value="spotify">Spotify</SelectItem>
              <SelectItem value="image">Image</SelectItem>
              <SelectItem value="video">Video</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">{post ? "Update" : "Create"} Post</Button>
      </div>
    </form>
  )
}

