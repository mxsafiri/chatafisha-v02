import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Filter } from "lucide-react"

export interface FilterDialogProps {
  selectedImpactType: string | null
  selectedSdgGoals: number[]
  selectedStatus: string | null
  onFilterChange: (filters: {
    impactType?: string | null
    sdgGoals?: number[]
    status?: string | null
  }) => void
}

const impactTypes = [
  { value: "waste-management", label: "Waste Management" },
  { value: "environmental", label: "Environmental" },
  { value: "social", label: "Social" },
  { value: "economic", label: "Economic" },
]

const statuses = [
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
]

const sdgGoals = [
  { id: 1, name: "No Poverty" },
  { id: 2, name: "Zero Hunger" },
  { id: 3, name: "Good Health and Well-being" },
  { id: 4, name: "Quality Education" },
  { id: 5, name: "Gender Equality" },
  { id: 6, name: "Clean Water and Sanitation" },
  { id: 7, name: "Affordable and Clean Energy" },
  { id: 8, name: "Decent Work and Economic Growth" },
  { id: 9, name: "Industry, Innovation and Infrastructure" },
  { id: 10, name: "Reduced Inequality" },
  { id: 11, name: "Sustainable Cities and Communities" },
  { id: 12, name: "Responsible Consumption and Production" },
  { id: 13, name: "Climate Action" },
  { id: 14, name: "Life Below Water" },
  { id: 15, name: "Life on Land" },
  { id: 16, name: "Peace, Justice and Strong Institutions" },
  { id: 17, name: "Partnerships for the Goals" },
]

export function FilterDialog({
  selectedImpactType,
  selectedSdgGoals,
  selectedStatus,
  onFilterChange,
}: FilterDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Projects</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Impact Type</Label>
              <RadioGroup
                value={selectedImpactType || ""}
                onValueChange={(value) =>
                  onFilterChange({ impactType: value || null })
                }
              >
                {impactTypes.map((type) => (
                  <div key={type.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.value} id={type.value} />
                    <Label htmlFor={type.value}>{type.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label>Status</Label>
              <RadioGroup
                value={selectedStatus || ""}
                onValueChange={(value) =>
                  onFilterChange({ status: value || null })
                }
              >
                {statuses.map((status) => (
                  <div key={status.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={status.value} id={status.value} />
                    <Label htmlFor={status.value}>{status.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div className="space-y-4">
              <Label>SDG Goals</Label>
              <div className="space-y-2">
                {sdgGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`sdg-${goal.id}`}
                      checked={selectedSdgGoals.includes(goal.id)}
                      onChange={(e) => {
                        const newGoals = e.target.checked
                          ? [...selectedSdgGoals, goal.id]
                          : selectedSdgGoals.filter((id) => id !== goal.id)
                        onFilterChange({ sdgGoals: newGoals })
                      }}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor={`sdg-${goal.id}`}>{goal.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
