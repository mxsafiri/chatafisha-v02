import * as z from "zod"
import type { ProjectType } from "@/types/project"

const locationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
})

export const dynamicMetricSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  unit: z.string().min(1, "Unit is required"),
  value: z.number().min(0, "Value must be positive"),
  type: z.enum(["environmental", "social", "economic", "other"]).optional(),
})

export const projectEvidenceSchema = z.object({
  id: z.string(),
  type: z.enum(["image", "video", "document"]),
  url: z.string().url(),
  description: z.string().min(1, "Description is required"),
  timestamp: z.string().datetime(),
  location: locationSchema,
  fileType: z.string(),
  fileSize: z.number(),
  fileName: z.string(),
})

export const impactMetricSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  unit: z.string().min(1, "Unit is required"),
  value: z.number().min(0, "Value must be positive"),
  type: z.enum(["environmental", "social", "economic", "other"]).optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  verifiedAt: z.string().optional(),
  verifiedBy: z.string().optional(),
  evidence: z.object({
    fileUrl: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
})

export const projectSubmissionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  projectType: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  isRecurring: z.boolean(),
  recurringInterval: z.enum(["daily", "weekly", "monthly", "quarterly", "yearly"]).optional(),
  location: locationSchema,
  impactMetrics: z.array(impactMetricSchema),
  evidence: z.array(projectEvidenceSchema),
  status: z.enum(["draft", "submitted", "in-review", "approved", "rejected"]),
  createdAt: z.string(),
  updatedAt: z.string(),
  submitter: z.object({
    id: z.string(),
    name: z.string(),
    organization: z.string(),
    avatar: z.string().optional(),
    contact: z.object({
      email: z.string().email(),
      phone: z.string().optional(),
      whatsapp: z.string().optional(),
    }),
    region: z.string(),
    ward: z.string(),
  }),
})

export const projectMetricFieldSchema = z.object({
  id: z.string(),
  label: z.string(),
  type: z.enum(["number", "text", "select"]),
  unit: z.string().optional(),
  options: z.array(z.string()).optional(),
  tooltip: z.string().optional(),
  icon: z.string().optional(),
  validation: z
    .object({
      min: z.number().optional(),
      max: z.number().optional(),
      required: z.boolean().optional(),
      pattern: z.string().optional(),
    })
    .optional(),
})

export const projectTypeMetrics: Record<ProjectType, z.ZodObject<any>> = {
  "waste-management": z.object({
    wasteType: z.enum(["plastic", "organic", "metal", "glass", "other"]),
    weightCollected: z.number().min(0),
    recyclingMethod: z.string(),
    collectionFrequency: z.enum(["daily", "weekly", "monthly"]),
  }),
  "tree-planting": z.object({
    treeSpecies: z.array(z.string()).min(1),
    areaCovered: z.number().min(0),
    survivalRate: z.number().min(0).max(100),
    maintenancePlan: z.string(),
  }),
  "water-sanitation": z.object({
    waterSourceType: z.enum(["well", "borehole", "river", "rainwater"]),
    litresProcessed: z.number().min(0),
    beneficiaryHouseholds: z.number().min(0),
    waterQualityMetrics: z.array(z.object({
      parameter: z.string(),
      value: z.number(),
      unit: z.string(),
    })),
  }),
  "renewable-energy": z.object({
    energyType: z.enum(["solar", "wind", "biogas", "hydro"]),
    capacityInstalled: z.number().min(0),
    householdsServed: z.number().min(0),
    co2Avoided: z.number().min(0),
  }),
  "education": z.object({
    programType: z.enum(["workshop", "training", "school", "campaign"]),
    participantsCount: z.number().min(0),
    durationHours: z.number().min(0),
    topicsCovered: z.array(z.string()).min(1),
  }),
  "community": z.object({
    initiativeType: z.enum(["cleanup", "awareness", "infrastructure", "other"]),
    participantsCount: z.number().min(0),
    communityFeedback: z.array(z.object({
      rating: z.number().min(1).max(5),
      comment: z.string(),
    })),
    impactAreas: z.array(z.string()).min(1),
  }),
}

export type ProjectSubmissionFormData = z.infer<typeof projectSubmissionSchema>
export type ProjectMetricFieldFormData = z.infer<typeof projectMetricFieldSchema>
