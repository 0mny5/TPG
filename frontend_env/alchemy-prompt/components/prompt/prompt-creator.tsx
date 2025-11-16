"use client"

import { useState } from "react"
import { PromptInputForm } from "./prompt-input-form"
import { PromptOutput } from "./prompt-output"
import { AdRewardModal } from "./ad-reward-modal"
import { toast } from "sonner"

const MAX_FREE_GENERATIONS = 5
const MAX_TOTAL_GENERATIONS = 10

export function PromptCreator() {
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [generatedNegativePrompt, setGeneratedNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)
  const [hasWatchedAd, setHasWatchedAd] = useState(false)
  const [showAdModal, setShowAdModal] = useState(false)

  const handleGenerate = async (formData: {
    direction: string
    atmosphere: string
    theme: string
    colors: string
    style: string
    story: string
  }) => {
    const currentLimit = hasWatchedAd ? MAX_TOTAL_GENERATIONS : MAX_FREE_GENERATIONS

    if (generationCount >= currentLimit) {
      toast.error("練成回数の上限に達しました", {
        description: hasWatchedAd ? "本日の練成回数を使い切りました" : "広告を視聴して追加の練成回数を獲得してください",
      })
      return
    }

    setIsGenerating(true)
    // Simulate AI generation
    const { prompt, negativePrompt } = await generatePrompts(formData)
    setGeneratedPrompt(prompt)
    setGeneratedNegativePrompt(negativePrompt)
    setIsGenerating(false)

    {/*const newCount = generationCount + 1
    setGenerationCount(newCount)*/}
    const newCount = 0

    if (newCount === MAX_FREE_GENERATIONS && !hasWatchedAd) {
      setTimeout(() => {
        setShowAdModal(true)
      }, 1000)
    }

    // Show remaining generations
    const remaining = currentLimit - newCount
    if (remaining > 0) {
      toast.success("プロンプトを錬成しました", {
        description: `残り${remaining}回練成できます`,
      })
    }
  }

  const handleAdComplete = () => {
    setHasWatchedAd(true)
    setShowAdModal(false)
    toast.success("追加錬成分を解放しました", {
      description: `合計${MAX_TOTAL_GENERATIONS}回まで練成できます`,
    })
  }

  const currentLimit = hasWatchedAd ? MAX_TOTAL_GENERATIONS : MAX_FREE_GENERATIONS
  const remainingGenerations = currentLimit - generationCount

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-3 text-balance">アトリエにようこそ！</h1>
        <p className="text-lg text-muted-foreground text-pretty">
          あなたのイメージを混ぜ合わせてプロンプトを練成しましょう
        </p>
        <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium text-foreground">
            残り練成回数: <span className="text-primary font-bold">{remainingGenerations}</span> / {currentLimit}
          </span>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <PromptInputForm onGenerate={handleGenerate} isGenerating={isGenerating} />
        <PromptOutput prompt={generatedPrompt} negativePrompt={generatedNegativePrompt} isGenerating={isGenerating} />
      </div>

      <AdRewardModal open={showAdModal} onComplete={handleAdComplete} />
    </div>
  )
}

async function generatePrompts(
data: {
  direction: string
  atmosphere: string
  theme: string
  colors: string
  style: string
  story: string
},
): { prompt: string; negativePrompt: string } {
  const parts = []

  if (data.direction) parts.push(data.direction)
  if (data.theme) parts.push(`${data.theme} theme`)
  if (data.atmosphere) parts.push(`${data.atmosphere} atmosphere`)
  if (data.colors) parts.push(`${data.colors} color palette`)
  if (data.story) parts.push(data.story)
  if (data.style) parts.push(`${data.style} style`)

  const qualityTags = [
    "highly detailed",
    "professional",
    "8k resolution",
    "sharp focus",
    "masterpiece",
    "trending on artstation",
  ]

  // FastAPI のエンドポイントを叩く
  const promise = fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/atelier/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: "example"
    })}
    ).then(res => res.json())
  const [response] = await Promise.all([promise])

  const prompt = `${response.prompt}\nBREAK\n${qualityTags.join(", ")}`
  const negativePrompt =
    "low quality, blurry, distorted, deformed, ugly, bad anatomy, bad proportions, watermark, signature, text, cropped, out of frame, worst quality, low resolution, jpeg artifacts"

  return { prompt, negativePrompt }
}
