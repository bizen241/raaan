import { AttemptResult, Question } from "../api/entities";
import { compileQuestions } from "./compiler";

export const getMinMaxTypeCount = (questions: Question[] = []) => {
  const compiledQuestions = compileQuestions(questions);

  let maxTypeCount = 0;
  let minTypeCount = 0;

  compiledQuestions.forEach(question => {
    question.roman.forEach(romanLine => {
      romanLine.forEach(romanChunk => {
        let maxChunkTypeCount = 0;
        let minChunkTypeCount = 0;

        romanChunk.candidates.forEach(candidate => {
          const candidateLength = candidate.length;

          if (candidateLength > maxChunkTypeCount) {
            maxChunkTypeCount = candidateLength;
          }
          if (candidateLength < minChunkTypeCount) {
            minChunkTypeCount = candidateLength;
          }
        });

        maxTypeCount += maxChunkTypeCount;
        minTypeCount += minChunkTypeCount;
      });
    });
  });

  return {
    maxTypeCount,
    minTypeCount
  };
};

export const getScore = ({ accuracy, time, typeCount }: AttemptResult) => (typeCount / (time / 1000)) * 60 * accuracy;
