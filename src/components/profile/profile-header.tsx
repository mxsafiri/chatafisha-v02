"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Calendar } from "lucide-react"
import type { User } from "@/types"

interface ProfileHeaderProps {
  user: User
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-background">
          <Image
            src={user.avatar}
            alt={user.name}
            fill
            className="object-cover"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <Badge variant="outline">{user.role}</Badge>
          </div>
          
          <div className="flex items-center gap-6 text-muted-foreground mb-4">
            {user.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{user.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
            </div>
          </div>
          
          {user.bio && (
            <p className="text-muted-foreground max-w-2xl">{user.bio}</p>
          )}
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">Share Profile</Button>
          <Button>Edit Profile</Button>
        </div>
      </div>
    </Card>
  )
}
