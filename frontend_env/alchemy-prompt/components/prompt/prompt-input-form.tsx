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
    style: string
    story: string
  }) => void
  isGenerating: boolean
}

const PRESETS = {
  direction: ["黄昏の神秘的な森", "未来的なサイバーパンク都市", "山中の古代寺院"],
  atmosphere: ["幻想的で神秘的", "暗くドラマチック", "明るく陽気"],
  theme: ["ファンタジー冒険", "SF技術", "歴史叙事詩"],
  colors: ["深い紫とエメラルドグリーン", "ネオンブルーとホットピンク", "温かいゴールドと豊かなブラウン"],
  style: [
    "デジタルペインティング、コンセプトアート",
    "フォトリアリスティック、シネマティック",
    "アニメスタイル、鮮やかな色",
  ],
  story5w1h: {
    what: ["孤独な戦士", "魔法のアーティファクト", "神秘的な生き物", "古代の巻物", "輝くポータル"],
    when: ["夜明けに", "嵐の最中", "満月の下で", "遠い未来に", "古代に"],
    where: ["忘れられた寺院で", "浮遊島で", "水晶の洞窟で", "現実の端で", "隠された庭園で"],
    whatObject: ["伝説の剣", "呪文の本", "神聖な遺物", "謎の鍵", "輝く球体"],
    how: ["古代の魔法で", "純粋な決意で", "先進技術を使って", "謎を解いて", "仲間の助けで"],
    whatHappened: [
      "隠された真実を発見する",
      "古代の力を目覚めさせる",
      "何世紀も続いた呪いを破る",
      "別世界への門を開く",
      "新しい何かに変身する",
    ],
  },
}

export function PromptInputForm({ onGenerate, isGenerating }: PromptInputFormProps) {
  const [formData, setFormData] = useState({
    direction: PRESETS.direction[0],
    atmosphere: PRESETS.atmosphere[0],
    theme: PRESETS.theme[0],
    colors: PRESETS.colors[0],
    style: PRESETS.style[0],
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
              Direction <span className="text-muted-foreground text-xs">(方向性)</span>
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
              Atmosphere <span className="text-muted-foreground text-xs">(雰囲気)</span>
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
              Theme <span className="text-muted-foreground text-xs">(主題)</span>
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
              Colors <span className="text-muted-foreground text-xs">(色)</span>
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

          <div className="space-y-2">
            <Label className="text-foreground">
              Style <span className="text-muted-foreground text-xs">(スタイル)</span>
            </Label>
            <RadioGroup value={formData.style} onValueChange={(value) => handleChange("style", value)}>
              <div className="grid grid-cols-3 gap-2">
                {PRESETS.style.map((preset, index) => (
                  <div key={index}>
                    <RadioGroupItem value={preset} id={`style-${index}`} className="peer sr-only" />
                    <Label
                      htmlFor={`style-${index}`}
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
                Story <span className="text-muted-foreground text-xs">(物語)</span>
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
                <Button
                  type="button"
                  size="sm"
                  variant={storyMode === "free" ? "default" : "outline"}
                  className={storyMode === "free" ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => setStoryMode("free")}
                >
                  自由入力
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
                      placeholder="例：孤独な戦士"
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
                      placeholder="例：夜明けに"
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
                      placeholder="例：忘れられた寺院で"
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
                      placeholder="例：伝説の剣"
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
                      placeholder="例：古代の魔法で"
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
                      placeholder="例：隠された真実を発見する"
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
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isGenerating}
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
