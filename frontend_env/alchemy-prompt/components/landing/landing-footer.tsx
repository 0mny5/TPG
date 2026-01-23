"use client"

import Link from "next/link"
import { Sparkles, Github } from "lucide-react"
import { useState } from "react"
import { ContactModal } from "./contact-modal"
import { TermsModal } from "./terms-modal"

interface LandingFooterProps {
  isLoggedIn?: boolean
}

export function LandingFooter({ isLoggedIn = false }: LandingFooterProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)

  return (
    <>
      <footer className="border-t border-border/40 py-12">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold text-primary">Alchemy Prompts</span>
              </Link>
              <p className="text-sm text-muted-foreground max-w-md leading-relaxed mb-4">
                錬金術の力で、あなたの創造的なビジョンを完璧なStable Diffusionプロンプトに変換します。
              </p>
              <div className="flex items-center gap-4">
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
                <Link
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">リンク</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#how-to-use" className="text-muted-foreground hover:text-foreground transition-colors">
                    使い方
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsTermsModalOpen(true)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    利用規約
                  </button>
                </li>
                {isLoggedIn && (
                  <li>
                    <button
                      onClick={() => setIsContactModalOpen(false)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      お問い合わせ
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 Alchemy Prompts. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </>
  )
}
