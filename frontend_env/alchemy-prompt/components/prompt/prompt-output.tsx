"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Download, Sparkles } from "lucide-react"
import { toast } from "sonner"

interface PromptOutputProps {
  prompt: string
  negativePrompt: string
  isGenerating: boolean
}

export function PromptOutput({ prompt, negativePrompt, isGenerating }: PromptOutputProps) {
  const [copiedPrompt, setCopiedPrompt] = useState(false)
  const [copiedNegative, setCopiedNegative] = useState(false)

  const handleCopyPrompt = async () => {
    await navigator.clipboard.writeText(prompt)
    setCopiedPrompt(true)
    toast.success("コピーしました", {
      description: "プロンプトがクリップボードにコピーされました",
    })
    setTimeout(() => setCopiedPrompt(false), 2000)
  }

  const handleCopyNegative = async () => {
    await navigator.clipboard.writeText(negativePrompt)
    setCopiedNegative(true)
    toast.success("コピーしました", {
      description: "ネガティブプロンプトがクリップボードにコピーされました",
    })
    setTimeout(() => setCopiedNegative(false), 2000)
  }

  const handleDownload = () => {
    const content = `プロンプト:\n${prompt}\n\nネガティブプロンプト:\n${negativePrompt}`
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `prompt-${Date.now()}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success("ダウンロード完了", {
      description: "プロンプトが保存されました",
    })
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur h-fit lg:sticky lg:top-24">
      <CardHeader>
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
            <Sparkles className="h-5 w-5 text-primary alchemy-glow" />
          </div>
          <CardTitle className="text-2xl">生成されたプロンプト</CardTitle>
        </div>
        <CardDescription>錬金されたStable Diffusionプロンプト</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isGenerating ? (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="relative">
              <div className="h-16 w-16 rounded-full border-4 border-primary/20" />
              <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-transparent border-t-primary" />
              <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary alchemy-glow" />
            </div>
            <p className="text-sm text-muted-foreground">ビジョンを錬金中...</p>
          </div>
        ) : prompt ? (
          <>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">プロンプト</h3>
                  <Button onClick={handleCopyPrompt} variant="ghost" size="sm" className="h-8 text-xs">
                    {copiedPrompt ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        コピー済み
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        コピー
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-lg border border-primary/30 bg-background/50 p-4">
                  <p className="text-sm font-mono text-foreground leading-relaxed whitespace-pre-wrap">{prompt}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-foreground">ネガティブプロンプト</h3>
                  <Button onClick={handleCopyNegative} variant="ghost" size="sm" className="h-8 text-xs">
                    {copiedNegative ? (
                      <>
                        <Check className="mr-1 h-3 w-3" />
                        コピー済み
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1 h-3 w-3" />
                        コピー
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-lg border border-secondary/30 bg-background/50 p-4">
                  <p className="text-sm font-mono text-foreground leading-relaxed whitespace-pre-wrap">
                    {negativePrompt}
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleDownload}
              variant="outline"
              className="w-full border-primary/30 hover:bg-primary/10 bg-transparent"
            >
              <Download className="mr-2 h-4 w-4" />
              両方をダウンロード
            </Button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
            <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">まだプロンプトがありません</p>
              <p className="text-xs text-muted-foreground">要素を入力して「生成」をクリックしてプロンプトを作成</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
