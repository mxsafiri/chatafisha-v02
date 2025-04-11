import * as z from "zod"
import type { ProjectType } from "@/types/project"

const locationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
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

export const projectSubmissionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  projectType: z.enum([
    "waste-management",
    "tree-planting",
    "water-sanitation",
    "renewable-energy",
    "education",
    "community",
  ] as const),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  isRecurring: z.boolean(),
  recurringInterval: z.enum([
    "daily",
    "weekly",
    "monthly",
    "quarterly",
    "yearly",
  ]).optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  evidence: z.array(projectEvidenceSchema).min(1, "At least one evidence item is required"),
  location: locationSchema,
  submitter: z.object({
    name: z.string().min(1, "Name is required"),
    organization: z.string().min(1, "Organization is required"),
    avatar: z.string().url().optional(),
    contact: z.object({
      email: z.string().email(),
      phone: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
      whatsapp: z.string().regex(/^\+?[1-9]\d{1,14}$/).optional(),
    }),
    region: z.string().min(1, "Region is required"),
    ward: z.string().min(1, "Ward is required"),
  }),
  metrics: z.object({
    base: z.object({
      peopleImpacted: z.number().min(0),
      wasteCollected: z.number().min(0),
      treesPlanted: z.number().min(0),
    }),
    specific: z.record(z.union([z.string(), z.number()])),
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
