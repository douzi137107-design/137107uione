"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { personas, type PersonaKey } from "@/data/personas";

const regularPersonaKeys: PersonaKey[] = [
  "SSR",
  "DRAMA",
  "MAGIC",
  "YOLO",
  "BOOM",
  "BEEF",
  "SHARK",
  "RICH",
  "TALKER",
  "FISHER",
  "GHOST",
  "XUEBA",
  "JUAN",
  "TANK",
  "PEACE",
  "ROCK",
];

export default function HomePersonaScanner() {
  const [scanCount, setScanCount] = useState(1);
  const [personaKey, setPersonaKey] = useState<PersonaKey>("MAGIC");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setScanCount((count) => count + 1);
      setPersonaKey((current) => {
        const next = regularPersonaKeys[Math.floor(Math.random() * regularPersonaKeys.length)];
        return next === current ? regularPersonaKeys[(regularPersonaKeys.indexOf(next) + 3) % regularPersonaKeys.length] : next;
      });
    }, 2800);

    return () => window.clearInterval(timer);
  }, []);

  const isBugFlash = scanCount % 5 === 0;
  const persona = useMemo(() => personas[isBugFlash ? "BUG" : personaKey], [isBugFlash, personaKey]);

  return (
    <div className="home-hero-visual">
      <div className="home-table-ring" />
      <div className={isBugFlash ? "home-scanner-card home-scanner-card-bug" : "home-scanner-card"}>
        <div className="home-scan-line" />
        <Image
          key={`${persona.key}-${scanCount}`}
          src={persona.image}
          alt={persona.chineseName}
          fill
          sizes="(max-width: 640px) 78vw, 320px"
          className={isBugFlash ? "home-scanner-image home-scanner-image-bug" : "home-scanner-image"}
          priority
        />
      </div>
    </div>
  );
}
