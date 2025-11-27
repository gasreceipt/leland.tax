import type React from "react"
import type { Metadata, Viewport } from "next"
import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://crowd.tax"),
  title: {
    default: "crowd.tax — Pay Your Fair Share",
    template: "%s | crowd.tax",
  },
  description:
    "A brutalist tax payment portal. Contribute your fair share through our streamlined payment system. Simple, direct, transparent.",
  keywords: ["tax payment", "crowd funding", "payment portal", "contribution", "tax"],
  authors: [{ name: "crowd.tax" }],
  creator: "crowd.tax",
  publisher: "crowd.tax",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://crowd.tax",
    title: "crowd.tax — Pay Your Fair Share",
    description: "A brutalist tax payment portal. Contribute your fair share through our streamlined payment system.",
    siteName: "crowd.tax",
  },
  twitter: {
    card: "summary_large_image",
    title: "crowd.tax — Pay Your Fair Share",
    description: "A brutalist tax payment portal. Simple, direct, transparent.",
  },
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
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/favicon-32x32.jpg",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: "/apple-touch-icon.jpg",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
