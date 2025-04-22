"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

interface YouTubeEmbedProps {
  videoId: string
  title: string
  thumbnailUrl?: string
}

export function YouTubeEmbed({ videoId, title, thumbnailUrl }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  // Default thumbnail if none provided
  const thumbnail = thumbnailUrl || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  
  return (
    <div className="relative w-full overflow-hidden rounded-lg aspect-video">
      {isPlaying ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      ) : (
        <div className="relative w-full h-full">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-16 w-16 rounded-full bg-primary/90 hover:bg-primary text-white border-none"
              onClick={() => setIsPlaying(true)}
            >
              <Play className="h-8 w-8" />
            </Button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-white font-medium text-lg">{title}</h3>
          </div>
        </div>
      )}
    </div>
  )
}

export function YouTubePlaylist({ videos }: { videos: YouTubeEmbedProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {videos.map((video) => (
        <YouTubeEmbed
          key={video.videoId}
          videoId={video.videoId}
          title={video.title}
          thumbnailUrl={video.thumbnailUrl}
        />
      ))}
    </div>
  )
}
