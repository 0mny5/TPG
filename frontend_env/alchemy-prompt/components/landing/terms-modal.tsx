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
                <li>
                  「サービス利用契約」とは、本規約を契約条件として当社と登録ユーザーの間で締結される、本サービスの利用契約を意味します。
                </li>
                <li>
                  「知的財産権」とは、著作権、特許権、実用新案権、意匠権、商標権その他の知的財産権（それらの権利を取得し、またはそれらの権利につき登録等を出願する権利を含みます。）を意味します。
                </li>
                <li>
                  「投稿データ」とは、登録ユーザーが本サービスを利用して投稿その他送信するコンテンツ（文章、画像、動画その他のデータを含みますがこれらに限りません。）を意味します。
                </li>
                <li>「当社」とは、Alchemy Promptsの運営者を意味します。</li>
                <li>
                  「本サービス」とは、当社が提供するAlchemy
                  Prompts（理由の如何を問わずサービスの名称または内容が変更された場合は、当該変更後のサービスを含みます。）という名称のサービスを意味します。
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第3条（登録）</h3>
              <p className="text-muted-foreground">
                本サービスの利用を希望する者（以下「登録希望者」といいます。）は、本規約を遵守することに同意し、かつ当社の定める一定の情報（以下「登録事項」といいます。）を当社の定める方法で当社に提供することにより、当社に対し、本サービスの利用の登録を申請することができます。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第4条（登録の拒否）</h3>
              <p className="text-muted-foreground mb-2">
                当社は、登録希望者が、以下の各号のいずれかの事由に該当する場合は、登録及び再登録を拒否することがあり、またその理由について一切開示義務を負いません。
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>当社に提供した登録事項の全部または一部につき虚偽、誤記または記載漏れがあった場合</li>
                <li>
                  未成年者、成年被後見人、被保佐人または被補助人のいずれかであり、法定代理人、後見人、保佐人または補助人の同意等を得ていなかった場合
                </li>
                <li>
                  反社会的勢力等（暴力団、暴力団員、右翼団体、反社会的勢力、その他これに準ずる者を意味します。以下同じ。）である、または資金提供その他を通じて反社会的勢力等の維持、運営もしくは経営に協力もしくは関与する等反社会的勢力等との何らかの交流もしくは関与を行っていると当社が判断した場合
                </li>
                <li>過去当社との契約に違反した者またはその関係者であると当社が判断した場合</li>
                <li>その他、登録を適当でないと当社が判断した場合</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第5条（利用料金および支払方法）</h3>
              <p className="text-muted-foreground">
                登録ユーザーは、本サービスを無料で利用することができます。ただし、当社は将来的に有料プランを導入する可能性があり、その場合は事前に登録ユーザーに通知するものとします。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第6条（禁止事項）</h3>
              <p className="text-muted-foreground mb-2">
                登録ユーザーは、本サービスの利用にあたり、以下の各号のいずれかに該当する行為または該当すると当社が判断する行為をしてはなりません。
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>法令に違反する行為または犯罪行為に関連する行為</li>
                <li>当社、本サービスの他の利用者またはその他の第三者に対する詐欺または脅迫行為</li>
                <li>公序良俗に反する行為</li>
                <li>
                  当社、本サービスの他の利用者またはその他の第三者の知的財産権、肖像権、プライバシーの権利、名誉、その他の権利または利益を侵害する行為
                </li>
                <li>
                  本サービスを通じ、以下に該当し、または該当すると当社が判断する情報を当社または本サービスの他の利用者に送信すること
                </li>
                <li>本サービスのネットワークまたはシステム等に過度な負荷をかける行為</li>
                <li>当社が提供するソフトウェアその他のシステムに対するリバースエンジニアリングその他の解析行為</li>
                <li>本サービスの運営を妨害するおそれのある行為</li>
                <li>当社のネットワークまたはシステム等への不正アクセス</li>
                <li>第三者に成りすます行為</li>
                <li>本サービスの他の利用者のIDまたはパスワードを利用する行為</li>
                <li>当社が事前に許諾しない本サービス上での宣伝、広告、勧誘、または営業行為</li>
                <li>本サービスの他の利用者の情報の収集</li>
                <li>当社、本サービスの他の利用者またはその他の第三者に不利益、損害、不快感を与える行為</li>
                <li>反社会的勢力等への利益供与</li>
                <li>前各号の行為を直接または間接に惹起し、または容易にする行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第7条（本サービスの停止等）</h3>
              <p className="text-muted-foreground mb-2">
                当社は、以下のいずれかに該当する場合には、登録ユーザーに事前に通知することなく、本サービスの全部または一部の提供を停止または中断することができるものとします。
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>本サービスに係るコンピューター・システムの点検または保守作業を緊急に行う場合</li>
                <li>
                  コンピューター、通信回線等の障害、誤操作、過度なアクセスの集中、不正アクセス、ハッキング等により本サービスの運営ができなくなった場合
                </li>
                <li>
                  地震、落雷、火災、風水害、停電、天災地変などの不可抗力により本サービスの運営ができなくなった場合
                </li>
                <li>その他、当社が停止または中断を必要と判断した場合</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第8条（権利帰属）</h3>
              <p className="text-muted-foreground">
                本サービスに関する知的財産権は全て当社または当社にライセンスを許諾している者に帰属しており、本規約に基づく本サービスの利用許諾は、本サービスに関する当社または当社にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第9条（登録抹消等）</h3>
              <p className="text-muted-foreground mb-2">
                当社は、登録ユーザーが、以下の各号のいずれかの事由に該当する場合は、事前に通知または催告することなく、投稿データを削除しもしくは当該登録ユーザーについて本サービスの利用を一時的に停止し、または登録ユーザーとしての登録を抹消することができます。
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>
                  支払停止もしくは支払不能となり、または破産手続開始、民事再生手続開始、会社更生手続開始、特別清算開始若しくはこれらに類する手続の開始の申立てがあった場合
                </li>
                <li>6ヶ月以上本サービスの利用がない場合</li>
                <li>当社からの問い合わせその他の回答を求める連絡に対して30日間以上応答がない場合</li>
                <li>第3条第4項各号に該当する場合</li>
                <li>その他、当社が本サービスの利用または登録ユーザーとしての登録の継続を適当でないと判断した場合</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第10条（免責事項）</h3>
              <p className="text-muted-foreground mb-2">
                当社は、本サービスに関して、登録ユーザーと他の登録ユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
              </p>
              <p className="text-muted-foreground">
                本サービスに関連して登録ユーザーと他の登録ユーザーまたは第三者との間において生じた取引、連絡または紛争等については、登録ユーザーが自己の責任によって解決するものとします。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第11条（サービス内容の変更、終了）</h3>
              <p className="text-muted-foreground">
                当社は、当社の都合により、本サービスの内容を変更し、または提供を終了することができます。当社が本サービスの提供を終了する場合、当社は登録ユーザーに事前に通知するものとします。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第12条（利用規約の変更）</h3>
              <p className="text-muted-foreground">
                当社は、当社が必要と認めた場合は、本規約を変更できるものとします。本規約を変更する場合、変更後の本規約の施行時期及び内容を当社ウェブサイト上での掲示その他の適切な方法により周知し、または登録ユーザーに通知します。但し、法令上登録ユーザーの同意が必要となるような内容の変更の場合は、当社所定の方法で登録ユーザーの同意を得るものとします。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第13条（連絡/通知）</h3>
              <p className="text-muted-foreground">
                本サービスに関する問い合わせその他登録ユーザーから当社に対する連絡または通知、及び本規約の変更に関する通知その他当社から登録ユーザーに対する連絡または通知は、当社の定める方法で行うものとします。
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-lg mb-2">第14条（準拠法及び管轄裁判所）</h3>
              <p className="text-muted-foreground">
                本規約の準拠法は日本法とし、本規約に起因し、または関連する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
              </p>
            </section>

            <div className="pt-4 border-t border-border/40 text-muted-foreground text-xs">
              <p>2025年1月1日 制定</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
