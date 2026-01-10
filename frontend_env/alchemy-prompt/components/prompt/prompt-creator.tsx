"use client"

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react"
import { PromptInputForm } from "./prompt-input-form"
import { PromptOutput } from "./prompt-output"
import { AdRewardModal } from "./ad-reward-modal"
import { toast } from "sonner"

const MAX_FREE_GENERATIONS = 5
const MAX_TOTAL_GENERATIONS = 10

export function PromptCreator(
  { session }: { session: Session | null },
) {
  const [generatedPrompt, setGeneratedPrompt] = useState("")
  const [generatedNegativePrompt, setGeneratedNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationCount, setGenerationCount] = useState(0)
  const [hasWatchedAd, setHasWatchedAd] = useState(false)
  const [showAdModal, setShowAdModal] = useState(false)

  useEffect(() => {
    fetchGeneratedCount(session?.idToken)
  })

  const fetchGeneratedCount = async (token: str) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/atelier/generated-count`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (res.status === 401) {
        signIn("google", { callbackUrl: "/atelier" })
        throw new Error("生成エラー: 認証が必要です。")
        return
      }

      const data = await res.json()
      setGenerationCount(data.generatedCount)
    } catch (e) {}
  }

  const handleGenerate = async (formData: {
    direction: string
    atmosphere: string
    theme: string
    colors: string
    angle: string
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
    const { prompt, negativePrompt, generateCount } = await generatePrompts(session.idToken, formData)
    setGeneratedPrompt(prompt)
    setGeneratedNegativePrompt(negativePrompt)
    setGenerationCount(generateCount)
    setIsGenerating(false)

    if (generationCount === MAX_FREE_GENERATIONS && !hasWatchedAd) {
      setTimeout(() => {
        setShowAdModal(true)
      }, 1000)
    }

    // Show remaining generations
    const remaining = currentLimit - generateCount
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

type GenerateResult = {
  prompt: string
  negativePrompt: string
  generateCount: string
}

async function generatePrompts(
idToken: str,
data: {
  direction: string
  atmosphere: string
  theme: string
  colors: string
  angle: string
  story: string
},
): Promise<GenerateResult> {
  // FastAPI のエンドポイントを叩く
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/atelier/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        ...data,
        atmosphere:  `${data.atmosphere}雰囲気`,
      })
    }).then(res => res.json())

    if (response.status === 401) {
      signIn("google", { callbackUrl: "/atelier" })
      throw new Error("生成エラー: 認証が必要です。")
      return
    }

    return { 
      prompt: response.prompt,
      negativePrompt: response.negativePrompt,
      generateCount: response.generateCount
    }
}
