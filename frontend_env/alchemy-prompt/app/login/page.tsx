import { LoginForm } from "@/components/auth/login-form"
import { Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 border border-primary/30">
              <Sparkles className="h-7 w-7 text-primary alchemy-glow" />
            </div>
            <span className="text-2xl font-bold text-primary">Alchemy Prompts</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">おかえりなさい！</h1>
          <p className="text-muted-foreground">さあ、イメージを膨らませる旅に出ましょう</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
