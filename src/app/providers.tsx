"use client"

import { ThemeProvider } from "@/components/providers/theme-provider"
import { UserProvider } from "@/components/providers/user-provider"
import { Toaster } from "@/components/ui/toaster"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { client } from "@/lib/thirdweb/client"
import { useState } from "react"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  // Create a React Query client instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }))

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <ThirdwebProvider client={client}>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </ThirdwebProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}
