import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container max-w-7xl mx-auto">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>あなたのアイデアを完璧なプロンプトに変換</span>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl text-balance">
            あなたのビジョンを <span className="text-primary alchemy-glow">Stable Diffusion</span> プロンプトに錬金
          </h1>

          <p className="mb-10 text-lg text-muted-foreground md:text-xl text-pretty max-w-2xl mx-auto">
            創造的な方向性、雰囲気、スタイルを入力するだけ。錬金術エンジンがあなたのアイデアをStable
            Diffusion向けに最適化された高品質な英語プロンプトに変換します。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8">
              <Link href="/login">
                作成を始める
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 border-primary/30 hover:bg-primary/10 bg-transparent"
            >
              サンプルを見る
            </Button>
          </div>

          <div className="mt-16 relative">
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur p-8 shadow-2xl">
              <div className="grid gap-4 md:grid-cols-3">
                <div
                  className="rounded-lg border border-primary/20 bg-primary/5 p-4 float-animation"
                  style={{ animationDelay: "0s" }}
                >
                  <div className="mb-2 text-sm font-medium text-primary">方向性</div>
                  <div className="text-xs text-muted-foreground">ファンタジー風景</div>
                </div>
                <div
                  className="rounded-lg border border-secondary/20 bg-secondary/5 p-4 float-animation"
                  style={{ animationDelay: "0.5s" }}
                >
                  <div className="mb-2 text-sm font-medium text-secondary">雰囲気</div>
                  <div className="text-xs text-muted-foreground">神秘的、幻想的</div>
                </div>
                <div
                  className="rounded-lg border border-accent/20 bg-accent/5 p-4 float-animation"
                  style={{ animationDelay: "1s" }}
                >
                  <div className="mb-2 text-sm font-medium text-accent">スタイル</div>
                  <div className="text-xs text-muted-foreground">デジタルペインティング</div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary alchemy-glow" />
              </div>
              <div className="mt-6 rounded-lg border border-primary/30 bg-background p-4">
                <div className="text-xs font-mono text-primary leading-relaxed">
                  "A mystical fantasy landscape with ethereal atmosphere, floating islands connected by magical bridges,
                  bioluminescent flora, dramatic volumetric lighting, digital painting style, highly detailed, 8k
                  resolution, trending on artstation"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
