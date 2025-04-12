import { Metadata } from "next"

export const metadata: Metadata = {
  metadataBase: new URL("https://impact-verify.netlify.app"),
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
    url: "https://impact-verify.netlify.app",
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
