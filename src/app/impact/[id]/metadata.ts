import type { Metadata } from "next"
import { mockProjects } from "@/lib/data/mock"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = mockProjects.find(p => p.id === params.id)

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you're looking for doesn't exist.",
    }
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images.map((url: string) => ({ url })),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.images,
    },
  }
}
