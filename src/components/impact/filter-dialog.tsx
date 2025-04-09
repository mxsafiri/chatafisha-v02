import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { sdgGoals } from "@/lib/data/mock"
import { Filter } from "lucide-react"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { SDGGoal } from "@/types"

interface FilterDialogProps {
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  sdgGoals: number[]
  impactType: string[]
  status: string[]
}

export function FilterDialog({ onFilterChange }: FilterDialogProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    sdgGoals: [],
    impactType: [],
    status: [],
  })

  const handleSdgToggle = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      sdgGoals: value.map((v) => parseInt(v)),
    }))
  }

  const handleImpactTypeToggle = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      impactType: value,
    }))
  }

  const handleStatusToggle = (value: string[]) => {
    setFilters((prev) => ({
      ...prev,
      status: value,
    }))
  }

  const handleApply = () => {
    onFilterChange(filters)
    setOpen(false)
  }

  const handleReset = () => {
    setFilters({
      sdgGoals: [],
      impactType: [],
      status: [],
    })
    onFilterChange({
      sdgGoals: [],
      impactType: [],
      status: [],
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Projects</DialogTitle>
          <DialogDescription>
            Filter projects by SDG goals, impact type, and status
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="font-medium">SDG Goals</h4>
            <ToggleGroup
              type="multiple"
              value={filters.sdgGoals.map(String)}
              onValueChange={handleSdgToggle}
              className="grid grid-cols-3 gap-2"
            >
              {sdgGoals.map((goal: SDGGoal) => (
                <ToggleGroupItem
                  key={goal.id}
                  value={goal.id.toString()}
                  aria-label={goal.name}
                  className="flex h-10 w-full items-center justify-center gap-2 text-xs"
                >
                  {goal.icon} {goal.name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Impact Type</h4>
            <ToggleGroup
              type="multiple"
              value={filters.impactType}
              onValueChange={handleImpactTypeToggle}
              className="grid grid-cols-2 gap-2"
            >
              <ToggleGroupItem value="waste-management">
                Waste Management
              </ToggleGroupItem>
              <ToggleGroupItem value="agriculture">Agriculture</ToggleGroupItem>
              <ToggleGroupItem value="water">Water</ToggleGroupItem>
              <ToggleGroupItem value="energy">Energy</ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Status</h4>
            <ToggleGroup
              type="multiple"
              value={filters.status}
              onValueChange={handleStatusToggle}
              className="grid grid-cols-3 gap-2"
            >
              <ToggleGroupItem value="pending">Pending</ToggleGroupItem>
              <ToggleGroupItem value="verified">Verified</ToggleGroupItem>
              <ToggleGroupItem value="rejected">Rejected</ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button onClick={handleApply}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
