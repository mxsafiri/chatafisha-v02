"use client"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { UserProvider } from "@/components/providers/user-provider"
import { Toaster } from "@/components/ui/toaster"
import { FirebaseErrorBoundary } from "@/components/error/firebase-error-boundary"

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
      <FirebaseErrorBoundary>
        <UserProvider>
          {children}
          <Toaster />
        </UserProvider>
      </FirebaseErrorBoundary>
    </ThemeProvider>
  )
}
