"use client";

import { useEffect, useMemo, useState } from "react";
import {
  drawLuckyHand,
  findLuckyHand,
  getPersonaLuckyReading,
  type LuckyCard,
  type LuckyHand,
} from "@/data/lucky-hands";
import type { PersonaKey } from "@/data/personas";

type SavedLuckyDraw = {
  handId: string;
  variant: number;
};

function hashSignature(value: string) {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash.toString(36);
}

function CardFace({ card, royal }: { card: LuckyCard; royal?: boolean }) {
  const suit = card.suit === "heart" ? "♥" : card.suit === "spade" ? "♠" : "?";
  const isRed = card.suit === "heart";

  return (
    <div
      className={[
        "lucky-card-face relative flex aspect-[3/4] w-[86px] flex-col justify-between rounded-2xl border bg-white p-3 text-night shadow-[0_18px_40px_rgba(0,0,0,.28)]",
        royal ? "border-amber-200 shadow-[0_18px_46px_rgba(255,214,102,.22)]" : "border-white/70",
      ].join(" ")}
    >
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

function LuckyResult({
  hand,
  personaKey,
  variant,
}: {
  hand: LuckyHand;
  personaKey: PersonaKey;
  variant: number;
}) {
  const reading = useMemo(() => getPersonaLuckyReading(personaKey, hand, variant), [hand, personaKey, variant]);

  return (
    <div
      className={[
        "animate-[lucky-rise_420ms_ease-out] overflow-hidden rounded-2xl border bg-[radial-gradient(circle_at_top,rgba(155,109,255,.22),transparent_55%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03))]",
        hand.royal ? "border-amber-200/50" : "border-violet/30",
      ].join(" ")}
    >
      <div className="border-b border-white/10 p-4 text-center">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet">Today&apos;s Hand</p>
        <h3 className="mt-1 text-2xl font-black tracking-normal text-white">今日幸运手牌</h3>
      </div>

      <div className="space-y-5 p-4">
        <div className="flex items-center justify-center gap-3">
          <CardFace card={hand.cards[0]} royal={hand.royal} />
          <CardFace card={hand.cards[1]} royal={hand.royal} />
        </div>

        <div className="text-center">
          <p className="text-3xl font-black tracking-normal text-white">{hand.code}</p>
          <p className={hand.royal ? "mt-1 text-sm font-black text-amber-200" : "mt-1 text-sm font-black text-violet"}>
            {hand.title}
          </p>
        </div>

        <div className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl border border-white/10 bg-night/45 p-3">
          <div>
            <p className="text-xs font-black text-white/45">玄学指数</p>
            <p className="text-2xl font-black text-white">{hand.index}</p>
          </div>
          {hand.hidden ? (
            <span className="rounded-full border border-violet/40 bg-violet/20 px-3 py-1 text-xs font-black text-violet">
              隐藏款
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

export default function LuckyHandDraw({
  personaKey,
  resultSignature,
}: {
  personaKey: PersonaKey;
  resultSignature: string;
}) {
  const storageKey = `pokerti.lucky.${hashSignature(resultSignature)}`;
  const [savedDraw, setSavedDraw] = useState<SavedLuckyDraw | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as SavedLuckyDraw;
        if (findLuckyHand(parsed.handId)) {
          setSavedDraw(parsed);
        }
      }
    } finally {
      setHasLoaded(true);
    }
  }, [storageKey]);

  const hand = savedDraw ? findLuckyHand(savedDraw.handId) : null;

  function draw() {
    if (savedDraw) {
      return;
    }

    const nextHand = drawLuckyHand();
    const nextDraw = {
      handId: nextHand.id,
      variant: Math.floor(Math.random() * 4),
    };

    window.localStorage.setItem(storageKey, JSON.stringify(nextDraw));
    setSavedDraw(nextDraw);
  }

  return (
    <section className="rounded-2xl border border-violet/35 bg-violet-soft/60 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet">Limited Luck</p>
          <h2 className="mt-1 text-xl font-black tracking-normal text-white">今日幸运手牌</h2>
          <p className="mt-2 text-xs font-medium leading-5 text-white/50">
            SSR / MAGIC / PEACE 限定彩蛋。测完只抽一次，抽到就是今天的牌桌玄学。
          </p>
        </div>
        <button
          type="button"
          onClick={draw}
          disabled={!hasLoaded || Boolean(savedDraw)}
          className="shrink-0 rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-black text-night shadow-[0_12px_30px_rgba(155,109,255,.22)] transition hover:bg-white/90 active:scale-95 disabled:cursor-not-allowed disabled:bg-white/40"
        >
          {savedDraw ? "已抽取" : "抽一手"}
        </button>
      </div>

      {hand && savedDraw ? (
        <div key={`${hand.id}-${savedDraw.variant}`} className="mt-4">
          <LuckyResult hand={hand} personaKey={personaKey} variant={savedDraw.variant} />
        </div>
      ) : (
        <button
          type="button"
          onClick={draw}
          disabled={!hasLoaded}
          className="mt-4 flex min-h-24 w-full items-center justify-center rounded-2xl border border-dashed border-violet/45 bg-night/35 text-sm font-black text-white/62 transition hover:border-violet hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          点击抽取今日手牌玄学签
        </button>
      )}
    </section>
  );
}
