import type { Metadata } from "next"
import { Inter, Urbanist } from "next/font/google"
import "@/styles/globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
})

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
})

export const metadata: Metadata = {
  title: "Chatafisha Impact Portal",
  description: "Connect impact-makers with funders and verifiers for sustainable community projects",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${urbanist.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
