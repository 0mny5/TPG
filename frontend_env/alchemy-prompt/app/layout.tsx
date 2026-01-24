import type React from "react"
import type { Metadata } from "next"
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google"
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css"
import { Suspense } from "react"
import { Toaster } from "sonner"

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
})

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Alchemy Prompts - 錬金術プロンプト生成",
  description: "Stable Diffusion向けの高品質な英語プロンプトを自動生成",
  generator: "v0.app",
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`font-sans ${notoSansJP.variable} ${notoSerifJP.variable} antialiased`}>
        <Suspense fallback={null}>
          {children}
          {process.env.GOOGLE_ANALYTICS_ID && (
            <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID} />
          )}
        </Suspense>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              border: "1px solid hsl(var(--border))",
            },
          }}
        />
      </body>
    </html>
  )
}
