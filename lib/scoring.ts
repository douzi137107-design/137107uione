import { personaOrder, type PersonaKey } from "@/data/personas";
import type { AnswerOption } from "@/data/questions";

export type ScoreMap = Record<PersonaKey, number>;

export type AnswerRecord = {
  questionIndex: number;
  scores: PersonaKey[];
};

export type ResultPayload = {
  result: PersonaKey;
  scores: ScoreMap;
  lateScores: ScoreMap;
};

export function createEmptyScores(): ScoreMap {
  return personaOrder.reduce((scores, key) => {
    scores[key] = 0;
    return scores;
  }, {} as ScoreMap);
}

export function calculateResult(answers: AnswerRecord[]): ResultPayload {
  const scores = createEmptyScores();
  const lateScores = createEmptyScores();

  answers.forEach((answer) => {
    answer.scores.forEach((key) => {
      scores[key] += 1;

      if (answer.questionIndex >= 11) {
        lateScores[key] += 1;
      }
    });
  });

  const result = personaOrder.reduce((winner, key) => {
    if (scores[key] > scores[winner]) {
      return key;
    }

    if (scores[key] === scores[winner] && lateScores[key] > lateScores[winner]) {
      return key;
    }

    return winner;
  }, personaOrder[0]);

  return { result, scores, lateScores };
}

export function optionToAnswerRecord(questionIndex: number, option: AnswerOption): AnswerRecord {
  return {
    questionIndex,
    scores: option.scores,
  };
}

export function isPersonaKey(value: string | null | undefined): value is PersonaKey {
  return personaOrder.includes(value as PersonaKey);
}
