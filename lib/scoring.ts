import { personaOrder, type PersonaKey } from "@/data/personas";
import type { AnswerOption } from "@/data/questions";

export type ScoreMap = Record<PersonaKey, number>;

export type AnswerRecord = {
  questionIndex: number;
  optionIndex: number;
  scores: PersonaKey[];
};

export type ResultPayload = {
  result: PersonaKey;
  scores: ScoreMap;
  lateScores: ScoreMap;
  hiddenCorrectCount?: number;
  hiddenUnlocked?: "BUG" | "KING" | null;
};

export const expertPath = [
  2, 3, 0, 0, 0, 0, 0, 2,
  0, 0, 2, 3, 2, 2, 0, 2,
  2, 0, 3, 3, 2, 3, 2, 0,
  1, 3, 2, 0, 3, 3, 2, 0,
];

export const hiddenCorrectOptions = [2, 0, 3];
export const baseQuestionCount = expertPath.length;

export function isExpertPathAnswers(answers: AnswerRecord[]) {
  return expertPath.every((optionIndex, questionIndex) =>
    answers.some((answer) => answer.questionIndex === questionIndex && answer.optionIndex === optionIndex),
  );
}

export function createEmptyScores(): ScoreMap {
  return personaOrder.reduce((scores, key) => {
    scores[key] = 0;
    return scores;
  }, {} as ScoreMap);
}

export function calculateResult(answers: AnswerRecord[]): ResultPayload {
  const scores = createEmptyScores();
  const lateScores = createEmptyScores();
  const normalAnswers = answers.filter((answer) => answer.questionIndex < baseQuestionCount);
  const hiddenAnswers = answers.filter((answer) => answer.questionIndex >= baseQuestionCount);
  const lateStartIndex = Math.max(0, normalAnswers.length - 5);

  normalAnswers.forEach((answer) => {
    answer.scores.forEach((key) => {
      scores[key] += 1;

      if (answer.questionIndex >= lateStartIndex) {
        lateScores[key] += 1;
      }
    });
  });

  const isExpertPath = isExpertPathAnswers(normalAnswers);
  const hiddenCorrectCount = hiddenCorrectOptions.reduce((count, optionIndex, index) => {
    const answer = hiddenAnswers.find((item) => item.questionIndex === baseQuestionCount + index);
    return count + (answer?.optionIndex === optionIndex ? 1 : 0);
  }, 0);

  const result = personaOrder.reduce((winner, key) => {
    if (scores[key] > scores[winner]) {
      return key;
    }

    if (scores[key] === scores[winner] && lateScores[key] > lateScores[winner]) {
      return key;
    }

    return winner;
  }, personaOrder[0]);

  if (isExpertPath && hiddenCorrectCount === 3) {
    return { result: "KING", scores, lateScores, hiddenCorrectCount, hiddenUnlocked: "KING" };
  }

  if (isExpertPath && hiddenCorrectCount === 2) {
    return { result: "BUG", scores, lateScores, hiddenCorrectCount, hiddenUnlocked: "BUG" };
  }

  return { result, scores, lateScores, hiddenCorrectCount, hiddenUnlocked: null };
}

export function optionToAnswerRecord(questionIndex: number, optionIndex: number, option: AnswerOption): AnswerRecord {
  return {
    questionIndex,
    optionIndex,
    scores: option.scores,
  };
}

export function isPersonaKey(value: string | null | undefined): value is PersonaKey {
  return personaOrder.includes(value as PersonaKey);
}
