"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { questions } from "@/data/questions";
import { complianceStatement } from "@/data/personas";
import { calculateResult, optionToAnswerRecord, type AnswerRecord } from "@/lib/scoring";

const emptyAnswers = Array<AnswerRecord | null>(questions.length).fill(null);

export default function TestExperience() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Array<AnswerRecord | null>>(emptyAnswers);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuestion = questions[currentIndex];
  const answeredCount = answers.filter(Boolean).length;
  const progress = Math.round((answeredCount / questions.length) * 100);

  function persistAndRoute(nextAnswers: AnswerRecord[]) {
    const resultPayload = calculateResult(nextAnswers);
    window.localStorage.setItem("pokerti.answers", JSON.stringify(nextAnswers));
    window.localStorage.setItem("pokerti.result", JSON.stringify(resultPayload));
    router.push(`/result?type=${resultPayload.result}`);
  }

  function chooseOption(optionIndex: number) {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    const option = currentQuestion.options[optionIndex];
    const answer = optionToAnswerRecord(currentIndex, optionIndex, option);
    const nextAnswers = [...answers];
    nextAnswers[currentIndex] = answer;

    setAnswers(nextAnswers);
    setSelectedOptionIndex(optionIndex);

    timerRef.current = setTimeout(() => {
      setSelectedOptionIndex(null);

      if (currentIndex === questions.length - 1) {
        persistAndRoute(nextAnswers.filter(Boolean) as AnswerRecord[]);
        return;
      }

      setCurrentIndex((index) => index + 1);
    }, 360);
  }

  function goBack() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    setSelectedOptionIndex(null);
    setCurrentIndex((index) => Math.max(0, index - 1));
  }

  function restart() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    window.localStorage.removeItem("pokerti.answers");
    window.localStorage.removeItem("pokerti.result");
    setAnswers(emptyAnswers);
    setSelectedOptionIndex(null);
    setCurrentIndex(0);
  }

  return (
    <main className="page-shell">
      <header className="mb-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-black text-white/60">
          PokerTI
        </Link>
        <button type="button" onClick={restart} className="text-sm font-black text-violet">
          重来
        </button>
      </header>

      <section className="soft-card flex flex-1 flex-col overflow-hidden">
        <div className="bg-white/10 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-[0.18em] text-violet">
              Question {currentIndex + 1}
            </span>
            <span className="text-xs font-black text-white/50">
              {answeredCount}/{questions.length}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-felt to-violet transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h1 className="mb-6 text-2xl font-black leading-snug tracking-normal text-white">
            {currentQuestion.q}
          </h1>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => {
              const selected = selectedOptionIndex === index;

              return (
                <button
                  key={option.text}
                  type="button"
                  onClick={() => chooseOption(index)}
                  className={[
                    "min-h-[82px] rounded-2xl border p-4 text-left transition focus:outline-none focus:ring-4 focus:ring-violet/30",
                    selected
                      ? "border-violet bg-violet-soft text-white"
                      : "border-white/10 bg-panel text-white/80 hover:border-violet/50 hover:bg-white/10",
                  ].join(" ")}
                >
                  <span className="mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs font-black text-violet">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="block text-sm font-bold leading-6">{option.text}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-7">
            <button
              type="button"
              onClick={goBack}
              disabled={currentIndex === 0}
              className="secondary-button w-full disabled:cursor-not-allowed disabled:opacity-40"
            >
              上一题
            </button>
            <p className="mt-4 text-center text-xs leading-5 text-white/40">
              {complianceStatement}
            </p>
            <p className="mt-2 text-center text-xs font-bold text-white/35">反馈建议微信：dou2392</p>
          </div>
        </div>
      </section>
    </main>
  );
}
