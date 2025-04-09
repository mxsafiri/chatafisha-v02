"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Filter } from "lucide-react"

const impactAreas = [
  { id: "waste", label: "Waste Management", icon: "♻️" },
  { id: "water", label: "Clean Water", icon: "💧" },
  { id: "energy", label: "Clean Energy", icon: "⚡" },
  { id: "food", label: "Food Security", icon: "🌾" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "health", label: "Healthcare", icon: "🏥" },
  { id: "climate", label: "Climate Action", icon: "🌍" },
  { id: "biodiversity", label: "Biodiversity", icon: "🌳" }
]

interface FilterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onFilterChange: (filters: FilterState) => void
}

interface FilterState {
  status: string
  impactAreas: string[]
  sortBy: string
}

export function FilterDialog({
  open,
  onOpenChange,
  onFilterChange,
}: FilterDialogProps) {
  const [status, setStatus] = useState<string>("all")
  const [selectedAreas, setSelectedAreas] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<string>("recent")

  const handleApplyFilters = () => {
    onFilterChange({
      status,
      impactAreas: selectedAreas,
      sortBy,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Projects
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="space-y-4">
            <Label>Project Status</Label>
            <RadioGroup
              defaultValue={status}
              onValueChange={setStatus}
              className="grid grid-cols-3 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="all"
                  id="all"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="all"
                  className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  All
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="active"
                  id="active"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="active"
                  className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  Active
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="completed"
                  id="completed"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="completed"
                  className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  Completed
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>Impact Areas</Label>
            <ToggleGroup
              type="multiple"
              value={selectedAreas}
              onValueChange={setSelectedAreas}
              className="grid grid-cols-2 gap-2"
            >
              {impactAreas.map((area) => (
                <ToggleGroupItem
                  key={area.id}
                  value={area.id}
                  className="flex items-center gap-2 data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
                >
                  <span>{area.icon}</span>
                  <span className="text-sm">{area.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          <div className="space-y-4">
            <Label>Sort By</Label>
            <RadioGroup
              defaultValue={sortBy}
              onValueChange={setSortBy}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem
                  value="recent"
                  id="recent"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="recent"
                  className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  Most Recent
                </Label>
              </div>
              <div>
                <RadioGroupItem
                  value="impact"
                  id="impact"
                  className="peer sr-only"
                />
                <Label
                  htmlFor="impact"
                  className="flex cursor-pointer items-center justify-center rounded-md border-2 border-muted bg-transparent p-2 hover:bg-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 peer-data-[state=checked]:text-primary"
                >
                  Most Impact
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handleApplyFilters}>Apply Filters</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
