import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DarkChat",
  description: "DarkChat by Swotch",
    generator: 'swotch.vercel.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className="dark">
      <body>{children}</body>
    </html>
  )
}


import './globals.css'