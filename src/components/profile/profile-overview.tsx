"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Calendar, Award, Users, Leaf } from "lucide-react"
import { mockUsers } from "@/lib/data/mock"
import { notFound } from "next/navigation"

interface ProfileOverviewProps {
  userId: string
}

export function ProfileOverview({ userId }: ProfileOverviewProps) {
  const user = mockUsers.find(u => u.id === userId)

  if (!user) {
    notFound()
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      {/* Bio Section */}
      <Card className="lg:col-span-5">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="text-2xl font-semibold">{user.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                  <span>•</span>
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                  <span>•</span>
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(user.joinedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{user.bio}</p>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Impact Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.metrics.projectsVerified}
                </p>
                <p className="text-sm text-muted-foreground">Projects Verified</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-green-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.metrics.peopleImpacted.toLocaleString()}
                </p>
                <p className="text-sm text-muted-foreground">People Impacted</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-yellow-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.metrics.wasteCollected.toLocaleString()} kg
                </p>
                <p className="text-sm text-muted-foreground">Waste Collected</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="lg:col-span-7">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center gap-4">
                <Badge variant="outline">{activity.type}</Badge>
                <p className="text-sm">{activity.description}</p>
                <span className="ml-auto text-sm text-muted-foreground">
                  {new Date(activity.date).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
