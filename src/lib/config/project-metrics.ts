import {
  Trash2,
  Trees,
  Droplets,
  Sun,
  GraduationCap,
  Users,
  Scale,
  type LucideIcon,
} from "lucide-react"
import type { ProjectType } from "@/types/project"

export const projectTypeIcons: Record<ProjectType, LucideIcon> = {
  "waste-management": Trash2,
  "tree-planting": Trees,
  "water-sanitation": Droplets,
  "renewable-energy": Sun,
  education: GraduationCap,
  community: Users,
}

export const projectTypeMetricFields = {
  "waste-management": [
    {
      id: "wasteType",
      label: "Waste Type",
      type: "select",
      options: ["plastic", "paper", "metal", "glass", "organic", "e-waste"],
      tooltip: "Select the primary type of waste collected",
    },
    {
      id: "recyclingRate",
      label: "Recycling Rate",
      type: "number",
      unit: "%",
      tooltip: "Percentage of waste that was recycled",
    },
    {
      id: "collectionPoints",
      label: "Collection Points",
      type: "number",
      tooltip: "Number of waste collection points established",
    },
  ],
  "tree-planting": [
    {
      id: "treeSpecies",
      label: "Tree Species",
      type: "select",
      options: ["indigenous", "fruit", "timber", "medicinal", "ornamental"],
      tooltip: "Type of trees planted",
    },
    {
      id: "survivalRate",
      label: "Survival Rate",
      type: "number",
      unit: "%",
      tooltip: "Percentage of trees that survived after planting",
    },
    {
      id: "landArea",
      label: "Land Area",
      type: "number",
      unit: "acres",
      tooltip: "Total area covered by tree planting",
    },
  ],
  "water-sanitation": [
    {
      id: "waterSource",
      label: "Water Source",
      type: "select",
      options: ["groundwater", "surface-water", "rainwater", "municipal"],
      tooltip: "Primary source of water",
    },
    {
      id: "waterQuality",
      label: "Water Quality",
      type: "select",
      options: ["potable", "treated", "untreated"],
      tooltip: "Quality of water provided",
    },
    {
      id: "waterVolume",
      label: "Water Volume",
      type: "number",
      unit: "liters",
      tooltip: "Total volume of water provided/treated",
    },
  ],
  "renewable-energy": [
    {
      id: "energyType",
      label: "Energy Type",
      type: "select",
      options: ["solar", "wind", "hydro", "biomass"],
      tooltip: "Type of renewable energy",
    },
    {
      id: "powerOutput",
      label: "Power Output",
      type: "number",
      unit: "kW",
      tooltip: "Total power output capacity",
    },
    {
      id: "householdsServed",
      label: "Households Served",
      type: "number",
      tooltip: "Number of households benefiting",
    },
  ],
  education: [
    {
      id: "programType",
      label: "Program Type",
      type: "select",
      options: ["workshop", "training", "school", "awareness"],
      tooltip: "Type of educational program",
    },
    {
      id: "sessionsDone",
      label: "Sessions Completed",
      type: "number",
      tooltip: "Number of educational sessions conducted",
    },
    {
      id: "materialsDistributed",
      label: "Materials Distributed",
      type: "number",
      tooltip: "Quantity of educational materials provided",
    },
  ],
  community: [
    {
      id: "initiativeType",
      label: "Initiative Type",
      type: "select",
      options: ["health", "skills", "culture", "sports"],
      tooltip: "Type of community initiative",
    },
    {
      id: "volunteersEngaged",
      label: "Volunteers Engaged",
      type: "number",
      tooltip: "Number of volunteers participating",
    },
    {
      id: "eventsOrganized",
      label: "Events Organized",
      type: "number",
      tooltip: "Number of community events held",
    },
  ],
} as const
