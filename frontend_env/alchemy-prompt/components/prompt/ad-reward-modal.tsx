"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Sparkles, Clock } from "lucide-react"

interface AdRewardModalProps {
  open: boolean
  onComplete: () => void
}

export function AdRewardModal({ open, onComplete }: AdRewardModalProps) {
  const [countdown, setCountdown] = useState(15)
  const [canClose, setCanClose] = useState(false)

  useEffect(() => {
    if (!open) {
      setCountdown(15)
      setCanClose(false)
      return
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setCanClose(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [open])

  const handleComplete = () => {
    onComplete()
  }

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            追加生成を解放
          </DialogTitle>
          <DialogDescription>広告を最後まで視聴すると、さらに4回プロンプトを生成できるようになります</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Google AdSense placeholder */}
          <div className="w-full h-[250px] bg-muted/30 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="text-center space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Google広告</p>
              {!canClose && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span className="text-lg font-semibold">{countdown}秒</span>
                </div>
              )}
            </div>
            {/* 実際の実装時にはここにGoogle AdSenseコードを配置 */}
            <p className="text-xs text-muted-foreground px-4 text-center">
              実装時: Google AdSense広告ユニットをここに配置
            </p>
          </div>

          <Button onClick={handleComplete} disabled={!canClose} className="w-full" size="lg">
            {canClose ? (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                追加生成を解放する
              </>
            ) : (
              `広告視聴中... (${countdown}秒)`
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            広告を最後まで視聴すると、合計10回までプロンプトを生成できます
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
