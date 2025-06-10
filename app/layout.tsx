import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevProjects - Premium Development Solutions",
  description:
    "Ready-to-deploy, production-grade applications built with modern technologies. Save months of development time with our premium project marketplace.",
  keywords: "web development, react, next.js, node.js, e-commerce, saas, dashboard, mobile app, backend",
  authors: [{ name: "DevProjects Team" }],
  openGraph: {
    title: "DevProjects - Premium Development Solutions",
    description: "Ready-to-deploy, production-grade applications built with modern technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevProjects - Premium Development Solutions",
    description: "Ready-to-deploy, production-grade applications built with modern technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
