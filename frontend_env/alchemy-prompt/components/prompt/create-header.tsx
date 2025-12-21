"use client"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react";

export function CreateHeader(
  { session }: { session: Session | null },
) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
            <Sparkles className="h-6 w-6 text-primary alchemy-glow" />
          </div>
          <span className="text-xl font-bold text-primary">Alchemy Prompts</span>
        </Link>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-secondary/50 transition-colors duration-200"
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >
            <img
              src={session?.user?.image ?? ""}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="font-medium text-foreground text-sm">{session?.user?.name}</span>
          </button>

          {/* ドロップダウンメニュー */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-secondary/50 transition-colors duration-200"
              >
                ログアウト
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
