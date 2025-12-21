"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Sparkles, Wand2, Shuffle } from "lucide-react"

interface PromptInputFormProps {
  onGenerate: (data: {
    direction: string
    atmosphere: string
    theme: string
    colors: string
    angle: string
    story: string
  }) => void
  isGenerating: boolean
}

const PRESETS = {
  direction: ["アニメ風", "実写風", "イラスト風", "ファンタジー", "サイバーパンク", "水彩風"],
  atmosphere: ["可愛い", "クール", "綺麗め", "ダーク", "暖かい", "スチームパンク"],
  theme: ["人物", "動物", "風景", "小物", "食べ物", "建築"],
  colors: ["柔らかい光", "ドラマチックな光", "カラフル", "モノトーン", "ゴールデンアワー", "ネオン"],
  angle: [
    "バストアップ",
    "全身",
    "クローズアップ",
    "俯瞰",
    "ローアングル",
    "背景中心",
  ],
  story5w1h: {
    what: [
      "赤い髪のボブカットの少女が",
      "ふわふわの毛並みをした小さな狐が",
      "淡い霧が漂う静かなロンドンの市街が",
      "鮮やかなターコイズのイブニングドレスが",
      "トースターで綺麗に焼き目をつけられたパンを乗せた皿が",
      "1000年の歴史を刻んだ西洋の古城が"
    ],
    when: [
      "朝日が差し込み始めた頃",
      "夕暮れの光が森を薄く照らす頃",
      "太陽が地平線から顔を出す瞬間に",
      "ネオンが街に灯り始める夕方に",
      "温かい光が差し込む午後のキッチンで",
      "月光が静かに大地を照らす夜更けに"
    ],
    where: [
      "静かな湖畔の木陰で",
      "木漏れ日の差す細い獣道で",
      "広大な草原の中央で",
      "古い石畳の通りの真ん中で",
      "数多くの食器が整然と並べられた木製カウンターの上に並び",
      "霧深い丘の上にそびえ立ち"
    ],
    whatObject: [
      "小さな白い花を一輪",
      "拾ったばかりの赤い木の実を",
      "ひときわ輝く露をまとった野花を",
      "小さなクラッチバッグとともに",
      "暖かい牛乳を注がれたカップと一緒に",
      "色褪せた石壁と蔦に覆われた塔を"
    ],
    how: [
      "胸の前でそっと包み込むように持ち",
      "前足で大切そうに抱えながら",
      "風に揺られながらきらりと輝かせて",
      "今にも手首を軽やかに振りそうなマネキンが持ち",
      "湯気を漂わせながら",
      "夜風にさらされながら静かに佇み"
    ],
    whatHappened: [
      "慈しむような優しい笑みでこちらを見た",
      "好奇心に満ちた瞳でこちらを見つめた",
      "世界が目覚めるような静かな瞬間を作り出した",
      "静と動を圧倒的な説得力で訴えかける",
      "誰もが心を落ち着ける午後のひと時を演出する",
      "まるで眠ったまま息づいているかのような気配を放った",
    ],
  },
}

export function PromptInputForm({ onGenerate, isGenerating }: PromptInputFormProps) {
  const [formData, setFormData] = useState({
    direction: PRESETS.direction[0],
    atmosphere: PRESETS.atmosphere[0],
    theme: PRESETS.theme[0],
    colors: PRESETS.colors[0],
    angle: PRESETS.angle[0],
    story: "",
  })

  const [storyMode, setStoryMode] = useState<"free" | "simple">("simple")
  const [story5w1h, setStory5w1h] = useState({
    what: "",
    when: "",
    where: "",
    whatObject: "",
    how: "",
    whatHappened: "",
  })

  const isAll5w1hFilled = () => {
    return (
      story5w1h.what.trim() !== "" &&
      story5w1h.when.trim() !== "" &&
      story5w1h.where.trim() !== "" &&
      story5w1h.whatObject.trim() !== "" &&
      story5w1h.how.trim() !== "" &&
      story5w1h.whatHappened.trim() !== ""
    )
  }

  const isFormValid = () => {
    if (storyMode === "simple") {
      return isAll5w1hFilled()
    }
    return formData.story.trim() !== ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let finalStory = formData.story
    if (storyMode === "simple") {
      const parts = [
        story5w1h.what,
        story5w1h.when,
        story5w1h.where,
        story5w1h.whatObject,
        story5w1h.how,
        story5w1h.whatHappened,
      ].filter(Boolean)
      finalStory = parts.join(", ")
    }

    onGenerate({ ...formData, story: finalStory })
  }


  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handle5w1hChange = (field: keyof typeof story5w1h, value: string) => {
    setStory5w1h((prev) => ({ ...prev, [field]: value }))
  }

  const randomize5w1h = (field: keyof typeof story5w1h) => {
    const options = PRESETS.story5w1h[field]
    const random = options[Math.floor(Math.random() * options.length)]
    handle5w1hChange(field, random)
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur h-fit">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
            <Wand2 className="h-5 w-5 text-primary" />
          </div>
          <CardTitle className="text-2xl">入力要素</CardTitle>
        </div>
        <CardDescription>以下の錬金術要素を使ってビジョンを説明してください</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label className="text-foreground">
              方向性 <span className="text-muted-foreground text-xs">(Style Direction)</span>
            </Label>
            <RadioGroup value={formData.direction} onValueChange={(value) => handleChange("direction", value)}>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.direction.map((preset, index) => (
                  <div key={index}>
                    <RadioGroupItem value={preset} id={`direction-${index}`} className="peer sr-only" />
                    <Label
                      htmlFor={`direction-${index}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-border bg-background px-2 py-3 text-xs hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                    >
                      {preset}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">
              雰囲気 <span className="text-muted-foreground text-xs">(Mood / Atmosphere)</span>
            </Label>
            <RadioGroup value={formData.atmosphere} onValueChange={(value) => handleChange("atmosphere", value)}>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.atmosphere.map((preset, index) => (
                  <div key={index}>
                    <RadioGroupItem value={preset} id={`atmosphere-${index}`} className="peer sr-only" />
                    <Label
                      htmlFor={`atmosphere-${index}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-border bg-background px-2 py-3 text-xs hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                    >
                      {preset}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">
              主題カテゴリ <span className="text-muted-foreground text-xs">(Main Subject Category)</span>
            </Label>
            <RadioGroup value={formData.theme} onValueChange={(value) => handleChange("theme", value)}>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.theme.map((preset, index) => (
                  <div key={index}>
                    <RadioGroupItem value={preset} id={`theme-${index}`} className="peer sr-only" />
                    <Label
                      htmlFor={`theme-${index}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-border bg-background px-2 py-3 text-xs hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                    >
                      {preset}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">
              構図・視点 <span className="text-muted-foreground text-xs">(Composition / Angle)</span>
            </Label>
            <RadioGroup value={formData.angle} onValueChange={(value) => handleChange("angle", value)}>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.angle.map((preset, index) => (
                  <div key={index}>
                    <RadioGroupItem value={preset} id={`angle-${index}`} className="peer sr-only" />
                    <Label
                      htmlFor={`angle-${index}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-border bg-background px-2 py-3 text-xs hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                    >
                      {preset}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label className="text-foreground">
              色・光のイメージ <span className="text-muted-foreground text-xs">(Color / Lighting Image)</span>
            </Label>
            <RadioGroup value={formData.colors} onValueChange={(value) => handleChange("colors", value)}>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.colors.map((preset, index) => (
                  <div key={index}>
                    <RadioGroupItem value={preset} id={`colors-${index}`} className="peer sr-only" />
                    <Label
                      htmlFor={`colors-${index}`}
                      className="flex cursor-pointer items-center justify-center rounded-md border-2 border-border bg-background px-2 py-3 text-xs hover:bg-accent peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground"
                    >
                      {preset}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-foreground">
                物語 <span className="text-muted-foreground text-xs">(Story)</span>
              </Label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant={storyMode === "simple" ? "default" : "outline"}
                  className={storyMode === "simple" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setStoryMode("simple")}
                >
                  簡易入力
                </Button>
              </div>
            </div>

            {storyMode === "free" ? (
              <Textarea
                id="story"
                placeholder="例：光るルーンが刻まれた古代の木々、隠された小道"
                value={formData.story}
                onChange={(e) => handleChange("story", e.target.value)}
                className="bg-input border-border min-h-[120px] resize-none"
              />
            ) : (
              <div className="space-y-3 p-4 bg-accent/30 rounded-lg border border-border/50">
                {/* What/Who */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground">何が/誰が？</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="例：赤い髪のボブカットの少女が"
                      value={story5w1h.what}
                      onChange={(e) => handle5w1hChange("what", e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => randomize5w1h("what")}
                      className="shrink-0"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* When */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground">いつ？</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="例：朝日が差し込み始めた頃"
                      value={story5w1h.when}
                      onChange={(e) => handle5w1hChange("when", e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => randomize5w1h("when")}
                      className="shrink-0"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Where */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground">どこで？</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="例：静かな湖畔の木陰で"
                      value={story5w1h.where}
                      onChange={(e) => handle5w1hChange("where", e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => randomize5w1h("where")}
                      className="shrink-0"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* What Object */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground">何を？</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="例：小さな白い花を一輪"
                      value={story5w1h.whatObject}
                      onChange={(e) => handle5w1hChange("whatObject", e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => randomize5w1h("whatObject")}
                      className="shrink-0"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* How */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground">どうやって？</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="例：胸の前でそっと包み込むように持ち"
                      value={story5w1h.how}
                      onChange={(e) => handle5w1hChange("how", e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => randomize5w1h("how")}
                      className="shrink-0"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* What Happened */}
                <div className="space-y-1.5">
                  <Label className="text-sm text-foreground">どうした？</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="例：慈しむような優しい笑みでこちらを見た"
                      value={story5w1h.whatHappened}
                      onChange={(e) => handle5w1hChange("whatHappened", e.target.value)}
                      className="bg-background"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="outline"
                      onClick={() => randomize5w1h("whatHappened")}
                      className="shrink-0"
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isGenerating || !isFormValid()}
            size="lg"
          >
            {isGenerating ? (
              <>
                <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                練成中...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                プロンプトを練成
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
