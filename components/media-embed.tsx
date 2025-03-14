"use client"

import { useState, useEffect } from "react"

interface MediaEmbedProps {
  url: string
  type: string
}

export default function MediaEmbed({ url, type }: MediaEmbedProps) {
  const [embedHtml, setEmbedHtml] = useState<string>("")

  useEffect(() => {
    if (type === "youtube") {
      // Extract YouTube video ID
      const videoId = new URL(url).searchParams.get("v")
      if (videoId) {
        setEmbedHtml(
          `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        )
      }
    } else if (type === "spotify") {
      // Extract Spotify URI
      const parts = url.split("/")
      const spotifyType = parts[parts.length - 2]
      const spotifyId = parts[parts.length - 1].split("?")[0]

      setEmbedHtml(
        `<iframe src="https://open.spotify.com/embed/${spotifyType}/${spotifyId}" width="100%" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`,
      )
    } else if (type === "image") {
      setEmbedHtml(`<img src="${url}" alt="Blog post media" class="max-w-full h-auto" />`)
    } else if (type === "video") {
      setEmbedHtml(`<video src="${url}" controls class="max-w-full h-auto"></video>`)
    }
  }, [url, type])

  return <div className="media-embed" dangerouslySetInnerHTML={{ __html: embedHtml }} />
}

