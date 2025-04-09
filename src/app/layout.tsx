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
  title: {
    default: "Chatafisha Impact Portal",
    template: "%s | Chatafisha Impact Portal",
  },
  description: "Connect impact-makers with funders and verifiers for sustainable community projects",
  keywords: ["impact", "sustainability", "community", "projects", "funding", "verification", "SDG", "environment"],
  authors: [{ name: "Chatafisha" }],
  creator: "Chatafisha",
  publisher: "Chatafisha",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chatafisha.com",
    title: "Chatafisha Impact Portal",
    description: "Connect impact-makers with funders and verifiers for sustainable community projects",
    siteName: "Chatafisha Impact Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chatafisha Impact Portal",
    description: "Connect impact-makers with funders and verifiers for sustainable community projects",
    creator: "@chatafisha",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
