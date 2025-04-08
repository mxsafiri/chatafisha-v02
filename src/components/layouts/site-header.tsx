"use client"

import Link from "next/link"
import { MainNav } from "@/components/layouts/main-nav"
import { ModeToggle } from "@/components/shared/mode-toggle"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/shared/user-nav"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-8">
          <div className="font-display text-xl font-bold">
            <span className="text-primary">Chata</span>fisha
          </div>
        </Link>
        <MainNav />
        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link href="/impact-explorer">
              Explore Impact
            </Link>
          </Button>
          <Button asChild>
            <Link href="/submit-impact">
              Submit Impact
            </Link>
          </Button>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </header>
  )
}
