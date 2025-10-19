import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function LandingCTA() {
  return (
    <section className="py-20 md:py-32">
      <div className="container max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 p-12 md:p-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />
          </div>

          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance mb-6">
              今すぐ始めましょう
            </h2>
            <p className="text-lg text-muted-foreground text-pretty mb-8">
              あなたの創造的なビジョンを完璧なStable Diffusionプロンプトに変換しましょう。
            </p>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
              <Link href="/login">
                プロンプト作成を始める
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
