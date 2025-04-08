"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const mainNavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Impact Explorer",
    href: "/impact-explorer",
  },
  {
    title: "About",
    href: "/about",
  },
]

export function MainNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
      {mainNavItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.href ? "text-foreground" : "text-foreground/60"
          )}
        >
          <motion.span
            className="relative py-1"
            whileHover={{ y: -1 }}
            transition={{ duration: 0.2 }}
          >
            {item.title}
            {pathname === item.href && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                layoutId="navbar-underline"
              />
            )}
          </motion.span>
        </Link>
      ))}
    </nav>
  )
}
