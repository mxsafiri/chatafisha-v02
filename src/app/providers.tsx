"use client"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { UserProvider } from "@/components/providers/user-provider"
import { Toaster } from "@/components/ui/toaster"
import { ThirdwebProvider } from "thirdweb/react"
import { client } from "@/lib/thirdweb/client"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ThirdwebProvider client={client}>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </ThirdwebProvider>
    </ThemeProvider>
  )
}
