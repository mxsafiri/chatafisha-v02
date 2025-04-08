"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Filter, Search } from "lucide-react"
import { SiteHeader } from "@/components/layouts/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImpactCard } from "@/components/impact/impact-card"
import { mockProjects } from "@/lib/data/mock"

export default function ImpactExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImpactType, setSelectedImpactType] = useState<string | null>(null)

  const filteredProjects = mockProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = !selectedImpactType || project.impactType.includes(selectedImpactType)
    
    return matchesSearch && matchesType
  })

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Impact Explorer</h1>
                <p className="text-muted-foreground">
                  Discover and support verified impact projects
                </p>
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter Projects
              </Button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <ImpactCard key={project.id} project={project} />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
