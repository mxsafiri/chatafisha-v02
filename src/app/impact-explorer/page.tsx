"use client"

import { useState } from "react"
import { mockProjects } from "@/lib/data/mock"
import type { ProjectSubmission } from "@/types/project"
import { FilterDialog } from "@/components/impact/filter-dialog"
import { ImpactCard } from "@/components/impact/impact-card"
import { SiteHeader } from "@/components/layouts/site-header"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutGrid, List } from "lucide-react"

export default function ImpactExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImpactType, setSelectedImpactType] = useState<string | null>(null)
  const [selectedSdgGoals, setSelectedSdgGoals] = useState<number[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")

  const filteredProjects = mockProjects.filter((project: ProjectSubmission) => {
    const matchesSearch = searchQuery === "" || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
                                        
    const matchesType = !selectedImpactType || project.type === selectedImpactType
                                        
    const matchesStatus = !selectedStatus || project.status === selectedStatus

    const matchesSdgGoals = selectedSdgGoals.length === 0 || 
      selectedSdgGoals.some(goal => project.sdgGoals.includes(goal))

    return matchesSearch && matchesType && matchesStatus && matchesSdgGoals
  })

  const handleFilterChange = ({
    impactType,
    sdgGoals,
    status,
  }: {
    impactType?: string | null
    sdgGoals?: number[]
    status?: string | null
  }) => {
    if (impactType !== undefined) setSelectedImpactType(impactType)
    if (sdgGoals !== undefined) setSelectedSdgGoals(sdgGoals)
    if (status !== undefined) setSelectedStatus(status)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="container flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Impact Explorer</h1>
            <div className="flex items-center space-x-2">
              <Tabs defaultValue={view} onValueChange={(value) => setView(value as "grid" | "list")}>
                <TabsList>
                  <TabsTrigger value="grid">
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Grid
                  </TabsTrigger>
                  <TabsTrigger value="list">
                    <List className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <FilterDialog
                selectedImpactType={selectedImpactType}
                selectedSdgGoals={selectedSdgGoals}
                selectedStatus={selectedStatus}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>
          
          <div className="flex w-full max-w-sm items-center space-x-2 mb-6">
            <Input 
              type="text" 
              placeholder="Search projects..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project: ProjectSubmission) => (
                <ImpactCard key={project.id} project={project} layout={view} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-lg font-medium">No projects found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
