"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BarChart3, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layouts/site-header"

const features = [
  {
    name: "Community Impact",
    description: "Empower marginalized communities to collect and verify impact data",
    icon: Users,
  },
  {
    name: "Transparent Verification",
    description: "Third-party verification ensures data integrity and trust",
    icon: Shield,
  },
  {
    name: "Impact Metrics",
    description: "Track and showcase your environmental and social impact",
    icon: BarChart3,
  },
]

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Communities Through
                    <span className="text-primary"> Verified Impact</span>
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Connect impact-makers with funders and verifiers. Make your environmental
                    and social projects count with transparent verification.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="w-full min-[400px]:w-auto">
                    <Link href="/impact-explorer">
                      Explore Projects <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full min-[400px]:w-auto">
                    <Link href="/submit-project">Submit Project</Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              >
                <div className="h-full w-full bg-gradient-to-br from-primary/20 via-primary/5 to-background rounded-xl border" />
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="grid gap-12 lg:grid-cols-3"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="rounded-full bg-primary/10 p-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
