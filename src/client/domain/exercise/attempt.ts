import { Question } from "../../../shared/api/entities";
import { CompiledQuestion } from "../../../shared/exercise/compiler";

export interface Attempt {
  questions: CompiledQuestion[];
  plan: number[];
}

export interface Typo {
  lineIndex: number;
  charIndex: number;
}

export interface QuestionResult {
  totalTime: number;
  typoMap: any;
  typedLines: string[][];
}

export const createPlan = (items: Question[]) => {
  const plan = [...Array(items.length).keys()];

  for (let i = plan.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [plan[i], plan[random]] = [plan[random], plan[i]];
  }

  return plan;
};

export const getTotalTime = (results: QuestionResult[]) => results.reduce((time, result) => time + result.totalTime, 1);

export const getTotalTypeCount = (results: QuestionResult[]) =>
  results.reduce(
    (totalTypeCount, result) => totalTypeCount + result.typedLines.map(typedLine => typedLine.join("")).join("").length,
    0
  );
