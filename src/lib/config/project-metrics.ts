import type { ProjectType, ProjectMetricField } from "@/types/project"
import {
  Trash2,
  Trees,
  Droplets,
  Sun,
  GraduationCap,
  Users,
  type LucideIcon,
} from "lucide-react"

export const projectTypeIcons: Record<ProjectType, LucideIcon> = {
  "waste-management": Trash2,
  "tree-planting": Trees,
  "water-sanitation": Droplets,
  "renewable-energy": Sun,
  education: GraduationCap,
  community: Users,
}

export const projectTypeMetricFields: Record<ProjectType, ProjectMetricField[]> = {
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
      id: "beneficiaries",
      label: "Beneficiaries",
      type: "number",
      tooltip: "Number of households/businesses benefiting",
    },
  ],
  education: [
    {
      id: "programType",
      label: "Program Type",
      type: "select",
      options: ["workshop", "training", "seminar", "course"],
      tooltip: "Type of educational program",
    },
    {
      id: "participants",
      label: "Participants",
      type: "number",
      tooltip: "Number of participants",
    },
    {
      id: "duration",
      label: "Duration",
      type: "number",
      unit: "hours",
      tooltip: "Total duration of the program",
    },
  ],
  community: [
    {
      id: "initiativeType",
      label: "Initiative Type",
      type: "select",
      options: ["outreach", "support", "development", "advocacy"],
      tooltip: "Type of community initiative",
    },
    {
      id: "beneficiaries",
      label: "Beneficiaries",
      type: "number",
      tooltip: "Number of community members benefiting",
    },
    {
      id: "volunteers",
      label: "Volunteers",
      type: "number",
      tooltip: "Number of volunteers involved",
    },
  ],
}
