"use client"

import { useState } from "react"
import { mockProjects } from "@/lib/data/mock"
import type { ProjectSubmission } from "@/types/project"
import { FilterDialog } from "@/components/impact/filter-dialog"
import { ImpactCard } from "@/components/impact/impact-card"

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
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Impact Explorer</h1>
        <FilterDialog
          selectedImpactType={selectedImpactType}
          selectedSdgGoals={selectedSdgGoals}
          selectedStatus={selectedStatus}
          onFilterChange={handleFilterChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project: ProjectSubmission) => (
          <ImpactCard key={project.id} project={project} layout={view} />
        ))}
      </div>
    </div>
  )
}
