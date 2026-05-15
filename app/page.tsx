import Link from "next/link";
import { complianceStatement, personaOrder } from "@/data/personas";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="flex flex-1 flex-col justify-between gap-7">
        <div className="space-y-6 pt-4">
          <div className="flex flex-wrap gap-2">
            {["PokerTI Beta", "16 种牌桌人格", "娱乐测评"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-violet/30 bg-violet-soft px-3 py-1 text-xs font-black text-violet"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-5xl font-black leading-tight tracking-normal text-white">
            16题测出你的
            <span className="block bg-gradient-to-r from-felt via-white to-violet bg-clip-text text-transparent">
              PokerTI 牌桌人格
            </span>
          </h1>
        </div>

        <div className="soft-card space-y-5 p-5">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-2xl font-black text-white">16</p>
              <p className="text-xs font-bold text-white/50">题目</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-2xl font-black text-white">{personaOrder.length}</p>
              <p className="text-xs font-bold text-white/50">人格</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-2xl font-black text-white">1</p>
              <p className="text-xs font-bold text-white/50">结果</p>
            </div>
          </div>

          <Link href="/test" className="primary-button w-full">
            开始测试
          </Link>

          <p className="rounded-xl border border-white/10 bg-night/50 p-3 text-center text-xs leading-5 text-white/50">
            {complianceStatement}
          </p>
        </div>

        <p className="pb-1 text-center text-xs font-bold text-white/35">作者 @豆子</p>
      </section>
    </main>
  );
}
