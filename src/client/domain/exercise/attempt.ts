import { AttemptResult, Question } from "../../../shared/api/entities";
import { CompiledQuestion, compileQuestions } from "../../../shared/exercise/compiler";

export interface Attempt {
  questions: CompiledQuestion[];
  plan: number[];
  results: QuestionResult[];
}

export interface Typo {
  key: string;
  lineIndex: number;
  charIndex: number;
}

export interface QuestionResult {
  totalTime: number;
  typos: Typo[];
  typedLines: string[][];
}

export const createAttempt = (questions: Question[]): Attempt => ({
  questions: compileQuestions(questions),
  plan: createPlan(questions),
  results: [],
});

export const createPlan = (questions: Question[]) => {
  const plan = [...Array(questions.length).keys()];

  for (let i = plan.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [plan[i], plan[random]] = [plan[random], plan[i]];
  }

  return plan;
};

export const summarizeResults = (results: QuestionResult[]): AttemptResult => {
  const time = results.reduce((totalTime, result) => totalTime + result.totalTime, 1);

  const typeCount = results.reduce(
    (totalTypeCount, result) =>
      totalTypeCount + result.typedLines.map((typedLine) => typedLine.join("")).join("").length,
    0
  );

  const typoCount = results.reduce((totalTypoCount, result) => totalTypoCount + result.typos.length, 0);
  const accuracy = Math.floor(((typeCount - typoCount) / typeCount) * 100);

  return {
    time,
    typeCount,
    accuracy,
  };
};
