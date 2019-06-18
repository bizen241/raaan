import { Question } from "../api/entities";
import { AttemptResult } from "../api/entities";
import { compileQuestions } from "./compiler";

export const getScore = ({ typeCount, time, accuracy }: AttemptResult) =>
  Math.floor((typeCount / (time / 1000)) * 60 * accuracy);

export const getTypeCountFromQuestions = (questions: Question[] = []) => {
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

export const rubyAnchorCharacter = "｜";
export const rubySeparatorCharacter = "《";
export const rubyTerminatorCharacter = "》";
