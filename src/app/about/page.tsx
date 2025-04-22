"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Leaf, Shield, Users, Recycle, Globe, CheckCircle2 } from "lucide-react"
import { SiteHeader } from "@/components/layouts/site-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YouTubeEmbed } from "@/components/ui/youtube-embed"

// Core values
const coreValues = [
  {
    title: "Community First",
    description: "We believe in empowering local communities to lead environmental initiatives and create sustainable change.",
    icon: Users,
    color: "text-blue-500"
  },
  {
    title: "Verified Impact",
    description: "Every project undergoes rigorous verification to ensure transparency and accountability in impact reporting.",
    icon: CheckCircle2,
    color: "text-green-500"
  },
  {
    title: "Environmental Stewardship",
    description: "Our focus is on creating long-term, sustainable solutions that benefit both the environment and communities.",
    icon: Leaf,
    color: "text-emerald-500"
  },
  {
    title: "Global Perspective",
    description: "While we act locally, we understand the global implications of environmental challenges and solutions.",
    icon: Globe,
    color: "text-indigo-500"
  },
  {
    title: "Circular Economy",
    description: "We promote systems that regenerate rather than deplete resources, turning waste into value.",
    icon: Recycle,
    color: "text-amber-500"
  },
  {
    title: "Data Transparency",
    description: "We maintain complete transparency in our operations, impact measurement, and fund allocation.",
    icon: Shield,
    color: "text-purple-500"
  }
]

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <div className="h-full w-full bg-gradient-to-br from-primary/20 via-primary/5 to-background" />
            <div className="absolute inset-0 bg-[url('/images/pattern-grid.svg')] bg-center opacity-10" />
          </div>
          <div className="relative mx-auto max-w-screen-xl px-4 py-24 sm:px-6 lg:flex lg:items-center lg:px-8">
            <motion.div 
              className="max-w-xl"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Creating Sustainable
                <strong className="block font-extrabold text-primary">
                  Impact Together
                </strong>
              </h1>

              <p className="mt-4 max-w-lg text-gray-500 dark:text-gray-400 sm:text-xl/relaxed">
                We're on a mission to empower communities through verified environmental impact projects and transparent sustainability initiatives.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/impact-explorer">
                    Explore Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/submit-project">Start Your Project</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="bg-muted/30">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <Tabs defaultValue="mission" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="mission">Our Mission</TabsTrigger>
                  <TabsTrigger value="vision">Our Vision</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="mission" className="space-y-4">
                <motion.div 
                  className="text-center max-w-3xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold sm:text-4xl mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    At Chatafisha, we connect impact-makers with funders and verifiers to create transparent, 
                    measurable environmental change. We empower communities to lead sustainable initiatives 
                    while ensuring accountability through rigorous verification processes.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ delay: 0.1 }}
                  >
                    <Recycle className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Waste Management</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Transforming waste into resources through innovative collection and recycling projects.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ delay: 0.2 }}
                  >
                    <Users className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Community Empowerment</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Building capacity within communities to lead and sustain environmental initiatives.
                    </p>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    transition={{ delay: 0.3 }}
                  >
                    <Shield className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-bold mb-2">Verified Impact</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Ensuring transparency and trust through rigorous verification of environmental claims.
                    </p>
                  </motion.div>
                </div>
              </TabsContent>
              
              <TabsContent value="vision">
                <motion.div 
                  className="text-center max-w-3xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                >
                  <h2 className="text-3xl font-bold sm:text-4xl mb-4">Our Vision</h2>
                  <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
                    We envision a world where environmental sustainability is driven by empowered communities, 
                    supported by transparent funding, and validated through rigorous verification. A world where 
                    every environmental project creates measurable, lasting impact.
                  </p>
                </motion.div>
                
                <motion.div
                  className="mt-8 max-w-3xl mx-auto"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-xl font-bold mb-4 text-center">See Our Vision in Action</h3>
                  <YouTubeEmbed 
                    videoId="fGPZZKKG-xk" 
                    title="Chatafisha Explainer Video" 
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div 
              className="mx-auto max-w-lg text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold sm:text-4xl">Our Impact</h2>
              <p className="mt-4">
                Together with our community, we've achieved significant milestones in environmental conservation and community development.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <motion.div 
                className="text-center bg-primary-foreground/10 rounded-lg p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: 0.1 }}
              >
                <h3 className="text-5xl font-extrabold">50+</h3>
                <p className="mt-2">Projects Funded</p>
              </motion.div>

              <motion.div 
                className="text-center bg-primary-foreground/10 rounded-lg p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-5xl font-extrabold">10K+</h3>
                <p className="mt-2">Community Members</p>
              </motion.div>

              <motion.div 
                className="text-center bg-primary-foreground/10 rounded-lg p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-5xl font-extrabold">100K+</h3>
                <p className="mt-2">KG Waste Collected</p>
              </motion.div>
              
              <motion.div 
                className="text-center bg-primary-foreground/10 rounded-lg p-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                transition={{ delay: 0.4 }}
              >
                <h3 className="text-5xl font-extrabold">15+</h3>
                <p className="mt-2">Countries Impacted</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div 
              className="mx-auto max-w-lg text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold sm:text-4xl">Our Values</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                The principles that guide our mission and shape our impact.
              </p>
            </motion.div>

            <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {coreValues.map((value, index) => (
                <motion.div 
                  key={value.title}
                  className="block rounded-xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm hover:border-primary hover:shadow-primary/10 transition-all"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeIn}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={`rounded-full w-12 h-12 flex items-center justify-center ${value.color} bg-gray-100 dark:bg-gray-800`}>
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">{value.title}</h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-primary/20 to-primary/5">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <motion.div 
              className="mx-auto max-w-lg text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold sm:text-4xl">Join Our Mission</h2>
              <p className="mt-4 text-gray-500 dark:text-gray-400">
                Whether you're a project creator, funder, or verifier, there's a place for you in our community.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/submit-project">Start Your Project</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/impact-explorer">Explore Projects</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
