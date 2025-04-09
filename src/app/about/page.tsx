import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SiteHeader } from "@/components/layouts/site-header"
import { Button } from "@/components/ui/button"

// Temporary placeholder images
const PLACEHOLDER_HERO = "https://placehold.co/1200x630/1a1a1a/ffffff?text=Chatafisha+Impact"
const PLACEHOLDER_MISSION = "https://placehold.co/800x600/1a1a1a/ffffff?text=Community+Impact"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0">
            <Image
              src={PLACEHOLDER_HERO}
              alt="Chatafisha community impact"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/60 to-background" />
          </div>
          <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:items-center lg:px-8">
            <div className="max-w-xl text-center sm:text-left">
              <h1 className="text-3xl font-extrabold sm:text-5xl">
                Creating Sustainable
                <strong className="block font-extrabold text-primary">
                  Impact Together
                </strong>
              </h1>

              <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                We're on a mission to empower communities through sustainable waste management and environmental conservation.
              </p>

              <div className="mt-8 flex flex-wrap gap-4 text-center">
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
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-muted/50">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                <Image
                  alt="Community members working on waste collection"
                  src={PLACEHOLDER_MISSION}
                  fill
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="lg:py-24">
                <h2 className="text-3xl font-bold sm:text-4xl">Our Mission</h2>

                <p className="mt-4 text-muted-foreground">
                  At Chatafisha, we believe in the power of community-driven initiatives to create lasting environmental impact. Our platform connects passionate individuals, committed organizations, and forward-thinking investors to support projects that make a real difference.
                </p>

                <p className="mt-4 text-muted-foreground">
                  Through our innovative approach to waste management and environmental conservation, we're building a sustainable future for generations to come.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Our Impact</h2>
              <p className="mt-4">
                Together with our community, we've achieved significant milestones in environmental conservation and community development.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center">
                <h3 className="text-5xl font-extrabold">50+</h3>
                <p className="mt-2">Projects Funded</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-extrabold">10K+</h3>
                <p className="mt-2">Community Members</p>
              </div>

              <div className="text-center">
                <h3 className="text-5xl font-extrabold">100K+</h3>
                <p className="mt-2">KG Waste Collected</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section>
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Our Values</h2>
              <p className="mt-4 text-muted-foreground">
                The principles that guide our mission and shape our impact.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="block rounded-xl border p-8 shadow-sm hover:border-primary hover:shadow-primary/10">
                <h3 className="mt-4 text-xl font-bold">Community First</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We believe in empowering local communities to lead environmental initiatives and create sustainable change.
                </p>
              </div>

              <div className="block rounded-xl border p-8 shadow-sm hover:border-primary hover:shadow-primary/10">
                <h3 className="mt-4 text-xl font-bold">Sustainable Impact</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Our focus is on creating long-term, sustainable solutions that benefit both the environment and communities.
                </p>
              </div>

              <div className="block rounded-xl border p-8 shadow-sm hover:border-primary hover:shadow-primary/10">
                <h3 className="mt-4 text-xl font-bold">Transparency</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We maintain complete transparency in our operations, impact measurement, and fund allocation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted">
          <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Join Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                Whether you're an individual, organization, or investor, there's a place for you in our community.
              </p>

              <Button size="lg" className="mt-8" asChild>
                <Link href="/submit-project">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
