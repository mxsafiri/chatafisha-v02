import type { ImpactMetricType } from "@/types/project"

export const defaultImpactMetrics: ImpactMetricType[] = [
  {
    id: "waste_collected",
    name: "Waste Collected",
    unit: "kg",
    description: "Amount of waste collected and properly disposed",
    category: "environmental"
  },
  {
    id: "trees_planted",
    name: "Trees Planted",
    unit: "count",
    description: "Number of trees planted",
    category: "environmental"
  },
  {
    id: "people_impacted",
    name: "People Impacted",
    unit: "count",
    description: "Number of people directly impacted by the project",
    category: "social"
  },
  {
    id: "jobs_created",
    name: "Jobs Created",
    unit: "count",
    description: "Number of jobs created through the project",
    category: "economic"
  },
  {
    id: "co2_reduced",
    name: "CO2 Emissions Reduced",
    unit: "kg",
    description: "Amount of CO2 emissions reduced",
    category: "environmental"
  },
  {
    id: "water_saved",
    name: "Water Saved",
    unit: "liters",
    description: "Amount of water saved or cleaned",
    category: "environmental"
  },
  {
    id: "workshops_conducted",
    name: "Workshops Conducted",
    unit: "count",
    description: "Number of educational workshops conducted",
    category: "social"
  }
]
