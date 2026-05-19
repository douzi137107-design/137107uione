import Link from "next/link";
import { complianceStatement } from "@/data/personas";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="flex flex-1 flex-col justify-between gap-6">
        <div className="space-y-5 pt-3">
          <div className="flex flex-wrap gap-2">
            {["PokerTI Beta", "16 种+1隐藏人格", "娱乐测评"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-violet/30 bg-violet-soft px-3 py-1 text-xs font-black text-violet"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="home-hero-visual">
            <div className="home-table-ring" />
            <div className="home-card-back">
              <div className="home-scan-line" />
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.18em] text-white/45">
                <span>PokerTI</span>
                <span>Locked</span>
              </div>
              <div className="mt-10 text-center">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-violet">Personality System</p>
                <p className="mt-3 text-4xl font-black tracking-normal text-white">UNKNOWN</p>
                <p className="mt-3 text-xs font-bold text-white/45">Hidden Archive: Locked</p>
              </div>
              <div className="mt-auto grid grid-cols-3 gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-white/40">
                <span>Read</span>
                <span className="text-center">Range</span>
                <span className="text-right">Style</span>
              </div>
            </div>
            <div className="home-pocket-card home-pocket-left">
              <span>A</span>
              <span>♠</span>
            </div>
            <div className="home-pocket-card home-pocket-right">
              <span>K</span>
              <span>♥</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-black leading-tight tracking-normal text-white">
              32题测出你的
              <span className="block bg-gradient-to-r from-[#d7b46a] via-white to-violet bg-clip-text text-transparent">
                PokerTI 牌桌人格
              </span>
            </h1>
            <p className="text-base font-medium leading-8 text-white/62">
              你以为你在选答案，
              <br />
              其实牌桌早就看出了你的习惯。
            </p>
          </div>
        </div>

        <div className="soft-card space-y-5 p-5">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-2xl font-black text-white">32</p>
              <p className="text-xs font-bold text-white/50">题目</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-2xl font-black text-white">16+1</p>
              <p className="text-xs font-bold text-white/50">人格</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3">
              <p className="text-2xl font-black text-white">1</p>
              <p className="text-xs font-bold text-white/50">结果</p>
            </div>
          </div>

          <Link href="/test" className="primary-button w-full">
            开始识别
          </Link>

          <p className="rounded-xl border border-white/10 bg-night/50 p-3 text-center text-xs leading-5 text-white/50">
            {complianceStatement}
          </p>
        </div>

        <p className="pb-1 text-center text-xs font-bold text-white/35">反馈建议微信：dou2392</p>
      </section>
    </main>
  );
}
