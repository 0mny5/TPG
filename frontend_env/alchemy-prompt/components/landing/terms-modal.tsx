"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">利用規約</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm leading-relaxed">
            <section>
              <h3 className="font-semibold text-lg mb-2">第1条（適用）</h3>
              <p className="text-muted-foreground">
                本規約は、本サービスの提供条件及び本サービスの利用に関する当社と登録ユーザーとの間の権利義務関係を定めることを目的とし、登録ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第2条（定義）</h3>
              <p className="text-muted-foreground mb-2">
                本規約において使用する以下の用語は、各々以下に定める意味を有するものとします。
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>「サービス利用契約」とは、本規約を契約条件として当社と登録ユーザーの間で締結される、本サービスの利用契約を意味します。</li>
                <li>「投稿データ」とは、登録ユーザーが本サービスを利用して入力、送信するプロンプトその他一切のデータを意味します。</li>
                <li>「生成データ」とは、本サービスを通じて生成される画像その他のアウトプットを意味します。</li>
                <li>「当社」とは、Alchemy Promptsの運営者を意味します。</li>
                <li>「本サービス」とは、当社が提供するAlchemy Promptsを意味します。</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第3条（登録）</h3>
              <p className="text-muted-foreground">
                本サービスの利用を希望する者は、本規約に同意の上、当社の定める方法により利用登録を行うものとします。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第4条（利用料金およびクレジット）</h3>
              <p className="text-muted-foreground mb-2">
                本サービスは、無料または当社が定める利用料金により提供されます。
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>画像生成等の機能には、クレジットまたは回数制限が設定される場合があります。</li>
                <li>
                  生成結果が登録ユーザーの意図・期待と異なる場合、または生成処理が正常に完了しなかった場合であっても、クレジットが消費されることがあります。
                </li>
                <li>消費されたクレジットについて、当社は返還義務を負いません。</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第5条（禁止事項）</h3>
              <p className="text-muted-foreground mb-2">
                登録ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>第三者の著作権、肖像権、プライバシーその他の権利を侵害する行為</li>
                <li>NSFW、成人向け、過度に暴力的または不適切な内容のプロンプトを意図的に入力する行為</li>
                <li>本サービスまたは第三者サービスの運営を妨害する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第6条（生成結果に関する非保証）</h3>
              <p className="text-muted-foreground mb-2">
                当社は、本サービスにより生成される生成データについて、その正確性、品質、完全性、特定目的への適合性を一切保証しません。
              </p>
              <p className="text-muted-foreground">
                生成データが登録ユーザーの意図、期待、イメージと一致しない場合であっても、当社は一切の責任を負いません。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第7条（NSFW・フィルタリングに関する免責）</h3>
              <p className="text-muted-foreground mb-2">
                本サービスは、Stable Diffusion等の外部画像生成AIを利用する場合があります。
              </p>
              <p className="text-muted-foreground">
                プロンプトにNSFWワードその他不適切と判断される表現が含まれる場合、生成処理が拒否または中断されることがあります。
                この場合においても、当該処理に関連してクレジットが消費されることがあり、当社は返金等の責任を負いません。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第8条（プロンプトおよび生成データの権利帰属）</h3>
              <p className="text-muted-foreground mb-2">
                登録ユーザーが入力するプロンプトは、著作権法上の保護対象とならない場合があり、特定の者に独占的に帰属する権利が発生しないことがあります。
              </p>
              <p className="text-muted-foreground">
                生成データの著作権の有無および帰属については、適用される法令および外部生成AIの利用条件に従うものとし、当社はこれを保証しません。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第9条（サービスの停止・変更・終了）</h3>
              <p className="text-muted-foreground">
                当社は、システム保守、外部サービスの停止、その他必要と判断した場合、事前の通知なく本サービスの全部または一部を停止、変更、または終了することがあります。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第10条（免責事項）</h3>
              <p className="text-muted-foreground">
                当社は、本サービスの利用により登録ユーザーに生じた損害について、当社の故意または重過失による場合を除き、一切の責任を負いません。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第11条（準拠法および管轄裁判所）</h3>
              <p className="text-muted-foreground">
                本規約の準拠法は日本法とし、本規約に関連して生じる一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            <div className="pt-4 border-t border-border/40 text-muted-foreground text-xs">
              <p>2026年1月24日 制定</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
