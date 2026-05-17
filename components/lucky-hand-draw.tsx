"use client";

import { useMemo, useState } from "react";
import { drawLuckyHand, getPersonaLuckyReading, type LuckyCard, type LuckyHand } from "@/data/lucky-hands";
import type { PersonaKey } from "@/data/personas";

function CardFace({ card }: { card: LuckyCard }) {
  const suit = card.suit === "heart" ? "♥" : card.suit === "spade" ? "♠" : "?";
  const isRed = card.suit === "heart";

  return (
    <div className="lucky-card-face relative flex aspect-[3/4] w-[86px] flex-col justify-between rounded-2xl border border-white/70 bg-white p-3 text-night shadow-[0_18px_40px_rgba(0,0,0,.28)]">
      <div className={isRed ? "text-coral" : "text-night"}>
        <p className="text-2xl font-black leading-none">{card.rank}</p>
        <p className="text-xl font-black leading-none">{suit}</p>
      </div>
      <div className={`self-center text-4xl font-black ${isRed ? "text-coral" : "text-night"}`}>{suit}</div>
      <div className={`rotate-180 self-end ${isRed ? "text-coral" : "text-night"}`}>
        <p className="text-2xl font-black leading-none">{card.rank}</p>
        <p className="text-xl font-black leading-none">{suit}</p>
      </div>
    </div>
  );
}

function LuckyResult({ hand, personaKey }: { hand: LuckyHand; personaKey: PersonaKey }) {
  const reading = useMemo(() => getPersonaLuckyReading(personaKey, hand), [hand, personaKey]);

  return (
    <div className="animate-[lucky-rise_420ms_ease-out] overflow-hidden rounded-2xl border border-violet/30 bg-[radial-gradient(circle_at_top,rgba(155,109,255,.22),transparent_55%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03))]">
      <div className="border-b border-white/10 p-4 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet">Today&apos;s Hand</p>
        <h3 className="mt-1 text-2xl font-black tracking-normal text-white">今日幸运手牌</h3>
      </div>

      <div className="space-y-5 p-4">
        <div className="flex items-center justify-center gap-3">
          <CardFace card={hand.cards[0]} />
          <CardFace card={hand.cards[1]} />
        </div>

        <div className="text-center">
          <p className="text-3xl font-black tracking-normal text-white">{hand.code}</p>
          <p className="mt-1 text-sm font-black text-violet">{hand.title}</p>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-night/45 p-3">
          <div>
            <p className="text-xs font-black text-white/45">玄学指数</p>
            <p className="text-2xl font-black text-white">{hand.index}</p>
          </div>
          {hand.hidden ? (
            <span className="rounded-full border border-violet/40 bg-violet/20 px-3 py-1 text-xs font-black text-violet">
              3% 隐藏款
            </span>
          ) : null}
        </div>

        <div className="flex flex-wrap gap-2">
          {hand.keywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-violet/15 px-3 py-2 text-xs font-black text-violet">
              {keyword}
            </span>
          ))}
        </div>

        <p className="rounded-2xl border border-white/10 bg-night/50 p-4 text-sm font-medium leading-7 text-white/70">
          {reading}
        </p>

        <p className="text-center text-xs font-bold leading-5 text-white/40">
          今日幸运手牌只是娱乐玄学，不构成任何牌局建议。
        </p>
      </div>
    </div>
  );
}

export default function LuckyHandDraw({ personaKey }: { personaKey: PersonaKey }) {
  const [hand, setHand] = useState<LuckyHand | null>(null);
  const [drawCount, setDrawCount] = useState(0);

  function draw() {
    setHand(drawLuckyHand());
    setDrawCount((count) => count + 1);
  }

  return (
    <section className="rounded-2xl border border-violet/35 bg-violet-soft/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet">Limited Luck</p>
          <h2 className="mt-1 text-xl font-black tracking-normal text-white">今日幸运手牌</h2>
          <p className="mt-2 text-xs font-medium leading-5 text-white/50">
            SSR / MAGIC / PEACE 限定彩蛋，隐藏盲打签概率 3%。
          </p>
        </div>
        <button
          type="button"
          onClick={draw}
          className="shrink-0 rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-black text-night shadow-[0_12px_30px_rgba(155,109,255,.22)] transition hover:bg-white/90 active:scale-95"
        >
          {hand ? "再抽一次" : "抽一手"}
        </button>
      </div>

      {hand ? (
        <div key={`${hand.id}-${drawCount}`} className="mt-4">
          <LuckyResult hand={hand} personaKey={personaKey} />
        </div>
      ) : (
        <button
          type="button"
          onClick={draw}
          className="mt-4 flex min-h-24 w-full items-center justify-center rounded-2xl border border-dashed border-violet/45 bg-night/35 text-sm font-black text-white/62 transition hover:border-violet hover:text-white"
        >
          点击抽取今日手牌玄学签
        </button>
      )}
    </section>
  );
}
