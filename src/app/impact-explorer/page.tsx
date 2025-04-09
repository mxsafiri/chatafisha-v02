"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { SiteHeader } from "@/components/layouts/site-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ImpactCard } from "@/components/impact/impact-card"
import { FilterDialog } from "@/components/impact/filter-dialog"
import { ViewToggle } from "@/components/impact/view-toggle"
import { mockProjects } from "@/lib/data/mock"
import type { ImpactProject } from "@/types"

export default function ImpactExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImpactType, setSelectedImpactType] = useState<string | null>(null)
  const [selectedSdgGoals, setSelectedSdgGoals] = useState<number[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [view, setView] = useState<"grid" | "list">("grid")

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = !selectedImpactType || project.impactType.includes(selectedImpactType)

    const matchesStatus = !selectedStatus || project.status === selectedStatus

    const matchesSdg =
      selectedSdgGoals.length === 0 ||
      selectedSdgGoals.some((goal) => project.sdgGoals.includes(goal))

    return matchesSearch && matchesType && matchesStatus && matchesSdg
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
              <div className="flex items-center gap-4">
                <ViewToggle view={view} onViewChange={setView} />
                <FilterDialog
                  selectedImpactType={selectedImpactType}
                  selectedSdgGoals={selectedSdgGoals}
                  selectedStatus={selectedStatus}
                  onFilterChange={handleFilterChange}
                />
              </div>
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

            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="rounded-full bg-muted p-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">No projects found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedImpactType(null)
                    setSelectedSdgGoals([])
                    setSelectedStatus(null)
                  }}
                >
                  Clear all filters
                </Button>
              </motion.div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    : "flex flex-col gap-4"
                }
              >
                {filteredProjects.map((project) => (
                  <ImpactCard key={project.id} project={project} view={view} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
