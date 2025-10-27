import { PromptCreator } from "@/components/prompt/prompt-creator"
import { CreateHeader } from "@/components/prompt/create-header"
import { LandingFooter } from "@/components/landing/landing-footer"

export default function AtelierPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        <CreateHeader />

        <div className="container max-w-7xl mx-auto py-4">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-[728px] h-[90px] bg-muted/30 border-2 border-dashed border-border rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium text-muted-foreground">Google広告バナー</p>
                <p className="text-xs text-muted-foreground">
                  実装時: Google AdSenseバナー広告（728x90 or レスポンシブ）
                </p>
              </div>
            </div>
          </div>
        </div>

        <main className="container max-w-7xl mx-auto py-8">
          <PromptCreator />
        </main>
        <LandingFooter isLoggedIn={true} />
      </div>
    </div>
  )
}
