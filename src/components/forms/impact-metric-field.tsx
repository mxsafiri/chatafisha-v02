"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { defaultImpactMetrics } from "@/lib/data/impact-metrics"
import type { ImpactMetric } from "@/types/project"

interface ImpactMetricFieldProps {
  value: ImpactMetric
  onChange: (value: ImpactMetric) => void
}

export function ImpactMetricField({
  value,
  onChange
}: ImpactMetricFieldProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label>People Impacted</Label>
        <Input
          type="number"
          min={0}
          value={value.peopleImpacted}
          onChange={(e) => onChange({ ...value, peopleImpacted: parseInt(e.target.value, 10) || 0 })}
        />
      </div>

      <div className="grid gap-2">
        <Label>Waste Collected (kg)</Label>
        <Input
          type="number"
          min={0}
          value={value.wasteCollected}
          onChange={(e) => onChange({ ...value, wasteCollected: parseInt(e.target.value, 10) || 0 })}
        />
      </div>

      <div className="grid gap-2">
        <Label>Trees Planted</Label>
        <Input
          type="number"
          min={0}
          value={value.treesPlanted}
          onChange={(e) => onChange({ ...value, treesPlanted: parseInt(e.target.value, 10) || 0 })}
        />
      </div>
    </div>
  )
}
