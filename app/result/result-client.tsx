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
  const [isRevealing, setIsRevealing] = useState(true);

  useEffect(() => {
    if (!resultPayload) {
      router.replace("/");
    }
  }, [resultPayload, router]);

  useEffect(() => {
    if (!resultPayload) {
      return;
    }

    const duration = resultPayload.result === "KING" ? 2100 : resultPayload.result === "BUG" ? 1700 : 1550;
    const timer = window.setTimeout(() => setIsRevealing(false), duration);

    return () => window.clearTimeout(timer);
  }, [resultPayload]);

  if (!resultKey) {
    return (
      <main className="page-shell">
        <section className="soft-card my-auto space-y-5 p-6 text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-violet">PokerTI</p>
          <h1 className="text-3xl font-black tracking-normal text-white">还没有测试结果</h1>
          <p className="text-sm leading-6 text-white/60">完成测试后，这里会生成你的牌桌人格卡片。</p>
          <Link href="/test" className="primary-button w-full">
            开始测试
          </Link>
          <p className="text-xs font-bold text-white/35">反馈建议微信：dou2392</p>
        </section>
      </main>
    );
  }

  const persona = personas[resultKey];
  const isHiddenPersona = persona.key === "BUG" || persona.key === "KING";
  const isKing = persona.key === "KING";
  const isBug = persona.key === "BUG";
  const rows = topScoreRows(resultPayload?.scores ?? null);
  const topScore = Math.max(1, rows[0]?.score ?? 1);
  const shareText =
    persona.key === "BUG"
      ? "我的 PokerTI 隐藏人格是：BUG｜系统漏洞。系统原本想给我贴标签，结果标签自己 fold 了。你们是牌桌人格，我像是测试程序里跑出来的隐藏 Boss。"
      : persona.key === "KING"
        ? "我的 PokerTI 隐藏人格是：KING｜被雪藏的王。不是我没有标签，是系统不敢轻易给我贴标签。"
        : `我的 PokerTI 牌桌人格是：${persona.englishName}｜${persona.chineseName}。${persona.description} 你也来测测。`;

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
      {isRevealing ? (
        <div
          className={[
            "fixed inset-0 z-50 flex items-center justify-center px-6 backdrop-blur-xl",
            isKing ? "king-ritual bg-black/96" : isBug ? "bug-ritual bg-night/95" : "result-ritual bg-night/95",
          ].join(" ")}
        >
          <div className="w-full max-w-sm text-center">
            <div
              className={[
                "mx-auto mb-6 grid h-32 w-32 place-items-center rounded-full border shadow-[0_0_70px_rgba(155,109,255,.28)]",
                isKing
                  ? "border-amber-200/50 bg-[radial-gradient(circle,rgba(245,184,74,.24),rgba(0,0,0,.12))] shadow-[0_0_90px_rgba(245,184,74,.3)]"
                  : "border-violet/35 bg-violet-soft",
              ].join(" ")}
            >
              <div className={isKing ? "king-card-stack relative h-20 w-14" : "ritual-card-stack relative h-20 w-14"}>
                <span className="absolute inset-0 rounded-xl border border-white/35 bg-white shadow-xl" />
                <span className="absolute inset-0 rounded-xl border border-white/35 bg-white shadow-xl" />
                <span className="absolute inset-0 rounded-xl border border-white/35 bg-white shadow-xl" />
              </div>
            </div>
            <p className={isKing ? "text-xs font-black uppercase tracking-[0.24em] text-amber-200" : "text-xs font-black uppercase tracking-[0.24em] text-violet"}>
              {isHiddenPersona ? "Hidden Archive" : "PokerTI Result"}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-normal text-white">
              {isKing ? "封存档案正在解除" : isBug ? "系统标签正在崩溃" : "正在揭晓你的牌桌人格"}
            </h2>
            <p className="mt-3 text-sm font-medium leading-6 text-white/55">
              {isKing
                ? "检测到被雪藏人格。请保持安静，王座正在回到牌桌。"
                : isBug
                  ? "分类失败，标签 fold。系统正在打开隐藏结果。"
                  : "洗牌、停顿、翻面。今天这张人格牌，只属于你。"}
            </p>
          </div>
        </div>
      ) : null}

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
              {isHiddenPersona ? "隐藏人格已解锁" : "你的人格标签"}
            </span>
            <div>
              <h1 className="text-5xl font-black leading-none tracking-normal text-white">{persona.englishName}</h1>
              <p className="mt-2 text-2xl font-black text-white/70">{persona.chineseName}</p>
            </div>
            <p className="text-base leading-8 text-white/70">{persona.description}</p>
          </div>

          <section className="rounded-2xl border border-felt/35 bg-felt-soft p-4">
            <h2 className="mb-3 text-sm font-black text-felt">{isHiddenPersona ? "隐藏特质" : "优势特质"}</h2>
            <div className="flex flex-wrap gap-2">
              {persona.strengths.map((item) => (
                <span key={item} className="rounded-full bg-felt/15 px-3 py-2 text-sm font-bold text-felt">
                  {item}
                </span>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-coral/35 bg-coral-soft p-4">
            <h2 className="mb-3 text-sm font-black text-coral">{isHiddenPersona ? "弱点检测" : "改进空间"}</h2>
            <div className="flex flex-wrap gap-2">
              {persona.improvements.map((item) => (
                <span key={item} className="rounded-full bg-coral/15 px-3 py-2 text-sm font-bold text-coral">
                  {item}
                </span>
              ))}
            </div>
          </section>

          {isHiddenPersona ? (
            <section className="rounded-2xl border border-violet/35 bg-violet-soft/45 p-4">
              <h2 className="mb-3 text-sm font-black text-violet">系统提示</h2>
              <p className="text-sm font-medium leading-7 text-white/65">
                {isKing
                  ? "该人格不在公开结果池中。触发封存档案：KING。系统封存协议已失效。"
                  : "该人格不在常规结果池中。只有当测试结果极度均衡，同时多个核心能力都达到高分时才会触发。"}
              </p>
            </section>
          ) : null}

          {["SSR", "MAGIC", "PEACE"].includes(persona.key) ? (
            <LuckyHandDraw personaKey={persona.key} resultSignature={storedResult ?? persona.key} />
          ) : null}

          {!isHiddenPersona && rows.length > 0 ? (
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
            <p className="text-xs font-bold text-white/35">反馈建议微信：dou2392</p>
          </div>
        </div>
      </section>
    </main>
  );
}
