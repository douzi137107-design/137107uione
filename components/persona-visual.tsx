"use client";

import Image from "next/image";
import { useState } from "react";

type PersonaVisualProps = {
  src: string;
  alt: string;
  label: string;
  priority?: boolean;
  className?: string;
};

export default function PersonaVisual({ src, alt, label, priority = false, className = "" }: PersonaVisualProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-violet-soft ${className}`}>
      {failed ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_top,rgba(155,109,255,.45),transparent_55%),linear-gradient(135deg,#181b2b,#0d0f18)] p-4 text-center">
          <span className="rounded-full border border-violet/40 bg-violet/20 px-3 py-1 text-xs font-black text-violet">
            PokerTI
          </span>
          <span className="text-4xl font-black tracking-normal text-white">{label}</span>
          <span className="text-xs font-semibold text-white/50">图片加载失败，已启用备用卡片</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 100vw, 520px"
          className="object-contain"
          priority={priority}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
