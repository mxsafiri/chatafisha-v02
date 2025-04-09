"use client"

import { useState } from "react"
import { Filter, X } from "lucide-react"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Badge,
} from "@/components/ui"
import { sdgGoals } from "@/lib/data/mock"

interface FilterDialogProps {
  selectedImpactType: string | null
  selectedSdgGoals: number[]
  selectedStatus: string | null
  onFilterChange: (filters: {
    impactType?: string | null
    sdgGoals?: number[]
    status?: string | null
  }) => void
}

export function FilterDialog({
  selectedImpactType,
  selectedSdgGoals,
  selectedStatus,
  onFilterChange,
}: FilterDialogProps) {
  const [open, setOpen] = useState(false)
  const [localImpactType, setLocalImpactType] = useState<string | null>(selectedImpactType)
  const [localSdgGoals, setLocalSdgGoals] = useState<number[]>(selectedSdgGoals)
  const [localStatus, setLocalStatus] = useState<string | null>(selectedStatus)

  const handleApplyFilters = () => {
    onFilterChange({
      impactType: localImpactType,
      sdgGoals: localSdgGoals,
      status: localStatus,
    })
    setOpen(false)
  }

  const handleReset = () => {
    setLocalImpactType(null)
    setLocalSdgGoals([])
    setLocalStatus(null)
    onFilterChange({
      impactType: null,
      sdgGoals: [],
      status: null,
    })
    setOpen(false)
  }

  const activeFiltersCount =
    (selectedImpactType ? 1 : 0) +
    (selectedSdgGoals.length > 0 ? 1 : 0) +
    (selectedStatus ? 1 : 0)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter Projects
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Projects</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <label className="text-sm font-medium">Impact Type</label>
            <Select
              value={localImpactType || ""}
              onValueChange={(value) => setLocalImpactType(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select impact type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="waste-management">Waste Management</SelectItem>
                <SelectItem value="community-engagement">Community Engagement</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="marine-conservation">Marine Conservation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">SDG Goals</label>
            <div className="flex flex-wrap gap-2">
              {sdgGoals.map((goal) => (
                <Badge
                  key={goal.id}
                  variant={localSdgGoals.includes(goal.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    setLocalSdgGoals((prev) =>
                      prev.includes(goal.id)
                        ? prev.filter((id) => id !== goal.id)
                        : [...prev, goal.id]
                    )
                  }}
                >
                  {goal.icon} {goal.title}
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-medium">Status</label>
            <Select
              value={localStatus || ""}
              onValueChange={(value) => setLocalStatus(value || null)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="ghost" onClick={handleReset}>
            <X className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
