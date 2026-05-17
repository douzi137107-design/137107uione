"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import LuckyHandDraw from "@/components/lucky-hand-draw";
import PersonaVisual from "@/components/persona-visual";
import { complianceStatement, personaOrder, personas } from "@/data/personas";
import { createEmptyScores, isPersonaKey, type ResultPayload, type ScoreMap } from "@/lib/scoring";

function subscribeToStorage() {
  return () => {};
}

function getStoredResultSnapshot() {
  return window.localStorage.getItem("pokerti.result");
}

function getServerSnapshot() {
  return null;
}

function parseStoredResult(raw: string | null): ResultPayload | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as ResultPayload;
    if (!isPersonaKey(parsed.result)) {
      return null;
    }

    return {
      result: parsed.result,
      scores: { ...createEmptyScores(), ...parsed.scores },
      lateScores: { ...createEmptyScores(), ...parsed.lateScores },
    };
  } catch {
    return null;
  }
}

function topScoreRows(scores: ScoreMap | null) {
  if (!scores) {
    return [];
  }

  return personaOrder
    .map((key) => ({ key, score: scores[key], persona: personas[key] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

export default function ResultClient() {
  const router = useRouter();
  const storedResult = useSyncExternalStore(subscribeToStorage, getStoredResultSnapshot, getServerSnapshot);
  const resultPayload = useMemo(() => parseStoredResult(storedResult), [storedResult]);
  const resultKey = resultPayload?.result ?? null;
  const [copyState, setCopyState] = useState("复制分享文案");

  useEffect(() => {
    if (!resultPayload) {
      router.replace("/");
    }
  }, [resultPayload, router]);

  if (!resultKey) {
    return (
      <main className="page-shell">
        <section className="soft-card my-auto space-y-5 p-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet">PokerTI</p>
          <h1 className="text-3xl font-black tracking-normal text-white">还没有测试结果</h1>
          <p className="text-sm leading-6 text-white/60">完成 32 道题后，这里会生成你的牌桌人格卡片。</p>
          <Link href="/test" className="primary-button w-full">
            开始测试
          </Link>
          <p className="text-xs font-bold text-white/35">作者 @豆子</p>
        </section>
      </main>
    );
  }

  const persona = personas[resultKey];
  const rows = topScoreRows(resultPayload?.scores ?? null);
  const topScore = Math.max(1, rows[0]?.score ?? 1);
  const shareText = `我的 PokerTI 牌桌人格是：${persona.englishName}｜${persona.chineseName}。${persona.description} 你也来测测。`;

  async function copyShareText() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopyState("已复制");
      window.setTimeout(() => setCopyState("复制分享文案"), 1600);
    } catch {
      setCopyState("复制失败，请手动复制");
      window.setTimeout(() => setCopyState("复制分享文案"), 1800);
    }
  }

  return (
    <main className="page-shell">
      <header className="mb-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-black text-white/60">
          PokerTI
        </Link>
        <Link href="/test" className="text-sm font-black text-violet">
          重新测试
        </Link>
      </header>

      <section className="soft-card overflow-hidden">
        <PersonaVisual
          src={persona.image}
          alt={persona.chineseName}
          label={persona.englishName}
          className="aspect-square"
          priority
        />

        <div className="space-y-6 p-5">
          <div className="space-y-3">
            <span className="inline-flex rounded-full border border-violet/35 bg-violet-soft px-3 py-1 text-xs font-black text-violet">
              你的人格标签
            </span>
            <div>
              <h1 className="text-5xl font-black leading-none tracking-normal text-white">{persona.englishName}</h1>
              <p className="mt-2 text-2xl font-black text-white/70">{persona.chineseName}</p>
            </div>
            <p className="text-base leading-8 text-white/70">{persona.description}</p>
          </div>

          <section className="rounded-2xl border border-felt/35 bg-felt-soft p-4">
            <h2 className="mb-3 text-sm font-black text-felt">优势特质</h2>
            <div className="flex flex-wrap gap-2">
              {persona.strengths.map((item) => (
                <span key={item} className="rounded-full bg-felt/15 px-3 py-2 text-sm font-bold text-felt">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-coral/35 bg-coral-soft p-4">
            <h2 className="mb-3 text-sm font-black text-coral">改进空间</h2>
            <div className="flex flex-wrap gap-2">
              {persona.improvements.map((item) => (
                <span key={item} className="rounded-full bg-coral/15 px-3 py-2 text-sm font-bold text-coral">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {["SSR", "MAGIC", "PEACE"].includes(persona.key) ? <LuckyHandDraw personaKey={persona.key} /> : null}

          {rows.length > 0 ? (
            <section className="rounded-2xl border border-white/10 bg-panel p-4">
              <h2 className="mb-4 text-sm font-black text-white">得分前五</h2>
              <div className="space-y-3">
                {rows.map((row) => (
                  <div key={row.key} className="grid grid-cols-[68px_1fr_24px] items-center gap-3">
                    <span className="truncate text-xs font-black text-violet">{row.persona.englishName}</span>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-felt to-violet"
                        style={{ width: `${Math.max(8, (row.score / topScore) * 100)}%` }}
                      />
                    </div>
                    <span className="text-right text-xs font-black text-white/50">{row.score}</span>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <div className="rounded-2xl border border-white/10 bg-night/50 p-4">
            <p className="text-sm leading-7 text-white/60">{shareText}</p>
          </div>

          <div className="grid gap-3">
            <button type="button" onClick={copyShareText} className="primary-button w-full">
              {copyState}
            </button>
            <Link href="/test" className="secondary-button w-full">
              重新测试
            </Link>
          </div>

          <div className="space-y-2 text-center">
            <p className="text-xs leading-5 text-white/40">{complianceStatement}</p>
            <p className="text-xs font-bold text-white/35">作者 @豆子</p>
          </div>
        </div>
      </section>
    </main>
  );
}
