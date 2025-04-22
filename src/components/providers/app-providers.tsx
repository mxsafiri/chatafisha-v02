"use client"

import { ReactNode } from "react"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { UserProvider } from "@/components/providers/user-provider"

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <UserProvider>
        {children}
      </UserProvider>
    </ThemeProvider>
  )
}
