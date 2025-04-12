import { Inter, Urbanist } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

const urbanist = Urbanist({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --font-sans: ${inter.style.fontFamily};
                --font-heading: ${urbanist.style.fontFamily};
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
