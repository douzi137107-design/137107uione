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

function loadPosterImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines?: number,
) {
  const chars = Array.from(text);
  const lines: string[] = [];
  let line = "";

  for (const char of chars) {
    const testLine = line + char;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines.push(line);
      line = char;
      if (maxLines && lines.length === maxLines) {
        break;
      }
    } else {
      line = testLine;
    }
  }

  if ((!maxLines || lines.length < maxLines) && line) {
    lines.push(line);
  }

  if (maxLines && lines.length === maxLines && chars.join("").length > lines.join("").length) {
    lines[lines.length - 1] = `${lines[lines.length - 1].slice(0, -2)}...`;
  }

  lines.forEach((currentLine, index) => {
    ctx.fillText(currentLine, x, y + index * lineHeight);
  });

  return lines.length * lineHeight;
}

export default function ResultClient() {
  const router = useRouter();
  const storedResult = useSyncExternalStore(subscribeToStorage, getStoredResultSnapshot, getServerSnapshot);
  const resultPayload = useMemo(() => parseStoredResult(storedResult), [storedResult]);
  const resultKey = resultPayload?.result ?? null;
  const [shareState, setShareState] = useState("分享");
  const [sharePoster, setSharePoster] = useState<string | null>(null);
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
  const posterTitle = `${persona.englishName}｜${persona.chineseName}`;
  const posterIntro =
    persona.key === "BUG"
      ? "别人是某种人格，你像是把人格系统打穿了。能稳，能冲，能算，能演；能社交，也能藏。系统试图给你分类，最后发现你不是选手，你是补丁之外的存在。"
      : persona.key === "KING"
        ? "系统原本也想把你归类，但归到最后发现：你不在分类表里，你在分类表上面。不是你没有标签，是系统不敢轻易给你贴标签。"
        : persona.description;
  const posterShareText =
    persona.key === "BUG"
      ? "系统原本想给我贴标签，结果标签自己 fold 了。"
      : persona.key === "KING"
        ? "不是我没有标签，是系统不敢轻易给我贴标签。"
        : `我的 PokerTI 牌桌人格是：${posterTitle}。你也来测测。`;

  async function createSharePoster() {
    setShareState("生成分享图中...");

    try {
      const posterWidth = 1080;
      const posterHeight = 1440;
      const canvas = document.createElement("canvas");
      canvas.width = posterWidth;
      canvas.height = posterHeight;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("Canvas is not supported.");
      }

      const isRoyal = persona.key === "KING";
      const accent = isRoyal ? "#f5b84a" : persona.key === "BUG" ? "#9b6dff" : "#30d58a";
      const secondaryAccent = isRoyal ? "#fff2bf" : "#9b6dff";

      const background = ctx.createLinearGradient(0, 0, posterWidth, posterHeight);
      background.addColorStop(0, isRoyal ? "#181006" : persona.key === "BUG" ? "#151026" : "#111722");
      background.addColorStop(0.48, "#0c1018");
      background.addColorStop(1, "#07080d");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, posterWidth, posterHeight);

      ctx.save();
      ctx.globalAlpha = isHiddenPersona ? 0.16 : 0.09;
      ctx.fillStyle = accent;
      ctx.font = "900 54px Arial, 'Microsoft YaHei', sans-serif";
      ctx.translate(124, 198);
      ctx.rotate(-0.32);
      for (let row = 0; row < 6; row += 1) {
        for (let col = 0; col < 3; col += 1) {
          ctx.fillText("pokerti.top", col * 390, row * 238);
        }
      }
      ctx.restore();

      ctx.save();
      roundedRect(ctx, 52, 52, 976, 1336, 52);
      ctx.fillStyle = "rgba(255,255,255,0.052)";
      ctx.fill();
      ctx.strokeStyle = isRoyal ? "rgba(245,184,74,0.48)" : persona.key === "BUG" ? "rgba(155,109,255,0.42)" : "rgba(255,255,255,0.15)";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      ctx.save();
      roundedRect(ctx, 78, 76, 924, 756, 44);
      const imagePanel = ctx.createLinearGradient(78, 76, 1002, 832);
      imagePanel.addColorStop(0, isRoyal ? "rgba(245,184,74,0.16)" : "rgba(255,255,255,0.08)");
      imagePanel.addColorStop(1, persona.key === "BUG" ? "rgba(155,109,255,0.16)" : "rgba(0,0,0,0.2)");
      ctx.fillStyle = imagePanel;
      ctx.fill();
      ctx.clip();
      try {
        const image = await loadPosterImage(persona.image);
        const ratio = Math.min(924 / image.width, 756 / image.height);
        const width = image.width * ratio;
        const height = image.height * ratio;
        ctx.drawImage(image, 78 + (924 - width) / 2, 76 + (756 - height) / 2, width, height);
      } catch {
        ctx.fillStyle = "rgba(155,109,255,0.24)";
        ctx.fillRect(78, 76, 924, 756);
        ctx.fillStyle = "#ffffff";
        ctx.font = "900 112px Arial, 'Microsoft YaHei', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(persona.englishName, 540, 448);
      }
      const imageFade = ctx.createLinearGradient(0, 570, 0, 840);
      imageFade.addColorStop(0, "rgba(7,8,13,0)");
      imageFade.addColorStop(1, "rgba(7,8,13,0.88)");
      ctx.fillStyle = imageFade;
      ctx.fillRect(78, 560, 924, 280);
      ctx.restore();

      if (persona.key === "BUG") {
        ctx.save();
        ctx.globalAlpha = 0.24;
        ctx.strokeStyle = "#9b6dff";
        ctx.lineWidth = 3;
        for (let y = 156; y < 760; y += 66) {
          ctx.beginPath();
          ctx.moveTo(104, y);
          ctx.lineTo(986, y + (y % 132 === 0 ? 16 : -12));
          ctx.stroke();
        }
        ctx.restore();
      }

      ctx.save();
      roundedRect(ctx, 86, isHiddenPersona ? 718 : 744, 908, isHiddenPersona ? 492 : 456, 38);
      ctx.fillStyle = "rgba(7,8,13,0.78)";
      ctx.fill();
      ctx.strokeStyle = isRoyal ? "rgba(245,184,74,0.26)" : "rgba(255,255,255,0.12)";
      ctx.stroke();
      ctx.restore();

      ctx.textAlign = "left";
      ctx.fillStyle = accent;
      ctx.font = "900 28px Arial, 'Microsoft YaHei', sans-serif";
      ctx.fillText(isRoyal ? "SEALED KING" : isBug ? "SYSTEM GLITCH" : "POKERTI RESULT", 116, isHiddenPersona ? 786 : 812);

      ctx.fillStyle = "#ffffff";
      ctx.font = isHiddenPersona ? "900 88px Arial, 'Microsoft YaHei', sans-serif" : "900 76px Arial, 'Microsoft YaHei', sans-serif";
      drawWrappedText(ctx, posterTitle, 112, isHiddenPersona ? 890 : 902, 840, isHiddenPersona ? 92 : 84, 2);

      ctx.fillStyle = "rgba(255,255,255,0.66)";
      ctx.font = "800 26px Arial, 'Microsoft YaHei', sans-serif";
      ctx.fillText(isHiddenPersona ? "隐藏人格已解锁" : "你的人格标签", 116, isHiddenPersona ? 1024 : 1000);

      let tagX = 116;
      let tagY = isHiddenPersona ? 1054 : 1030;
      persona.strengths.slice(0, 4).forEach((tag) => {
        ctx.font = "800 26px Arial, 'Microsoft YaHei', sans-serif";
        const width = Math.min(300, ctx.measureText(tag).width + 44);
        if (tagX + width > 964) {
          tagX = 116;
          tagY += 54;
        }
        roundedRect(ctx, tagX, tagY, width, 40, 20);
        ctx.fillStyle = isRoyal ? "rgba(245,184,74,0.16)" : "rgba(48,213,138,0.14)";
        ctx.fill();
        ctx.fillStyle = isRoyal ? "#ffe39a" : "#67f0b0";
        ctx.fillText(tag, tagX + 22, tagY + 28);
        tagX += width + 14;
      });

      ctx.fillStyle = "rgba(255,255,255,0.82)";
      ctx.font = "700 30px Arial, 'Microsoft YaHei', sans-serif";
      drawWrappedText(ctx, posterIntro, 116, isHiddenPersona ? 1172 : 1148, 840, 40, isHiddenPersona ? 3 : 4);

      ctx.save();
      roundedRect(ctx, 86, 1234, 908, 96, 30);
      ctx.fillStyle = isRoyal ? "rgba(245,184,74,0.12)" : persona.key === "BUG" ? "rgba(155,109,255,0.16)" : "rgba(255,255,255,0.075)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,0.86)";
      ctx.font = "800 25px Arial, 'Microsoft YaHei', sans-serif";
      drawWrappedText(ctx, posterShareText, 122, 1274, 836, 34, 2);
      ctx.restore();

      ctx.fillStyle = secondaryAccent;
      ctx.font = "900 28px Arial, 'Microsoft YaHei', sans-serif";
      ctx.fillText("pokerti.top", 92, 1372);

      ctx.textAlign = "right";
      ctx.fillStyle = "rgba(255,255,255,0.5)";
      ctx.font = "700 18px Arial, 'Microsoft YaHei', sans-serif";
      drawWrappedText(
        ctx,
        "本测试仅用于德扑兴趣社交娱乐交流，不提供金钱输赢建议，禁止任何形式的赌博行为。",
        986,
        1356,
        500,
        26,
        2,
      );

      setSharePoster(canvas.toDataURL("image/png"));
      setShareState("分享图已生成");
      window.setTimeout(() => setShareState("分享"), 1600);
    } catch {
      setShareState("生成失败，请再试一次");
      window.setTimeout(() => setShareState("分享"), 1800);
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
            <button type="button" onClick={createSharePoster} className="primary-button w-full">
              {shareState}
            </button>
            <Link href="/test" className="secondary-button w-full">
              重新测试
            </Link>
          </div>

          {sharePoster ? (
            <section className="rounded-2xl border border-violet/35 bg-violet-soft/30 p-3">
              <p className="mb-3 text-center text-xs font-bold text-white/45">长按图片即可保存分享</p>
              <img
                src={sharePoster}
                alt={`${persona.englishName} 分享图`}
                className="w-full rounded-xl border border-white/10 bg-night shadow-card"
              />
            </section>
          ) : null}

          <div className="space-y-2 text-center">
            <p className="text-xs leading-5 text-white/40">{complianceStatement}</p>
            <p className="text-xs font-bold text-white/35">反馈建议微信：dou2392</p>
          </div>
        </div>
      </section>
    </main>
  );
}
