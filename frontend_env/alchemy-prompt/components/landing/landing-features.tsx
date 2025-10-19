import { Wand2, Zap, Palette, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Wand2,
    title: "直感的な入力",
    description: "自然な言葉でビジョンを説明するだけ。複雑な構文は不要です。",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "即座に生成",
    description: "錬金術エンジンが入力を処理し、数秒で最適化されたプロンプトを生成します。",
    color: "text-accent",
  },
  {
    icon: Palette,
    title: "5W1H形式対応",
    description: "物語を5W1H形式で入力可能。ランダム生成機能で創作のヒントも得られます。",
    color: "text-secondary",
  },
  {
    icon: Sparkles,
    title: "品質最適化",
    description: "品質タグ、技術パラメータ、スタイル修飾子を自動的に追加して強化します。",
    color: "text-primary",
  },
]

export function LandingFeatures() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-7xl mx-auto">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance mb-4">
            プロンプト錬金術の技
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            神秘的なツールでシンプルなアイデアを強力なプロンプトに変換
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 bg-card/50 backdrop-blur hover:border-primary/30 transition-colors"
            >
              <CardHeader>
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 border border-primary/20`}
                >
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
