import { Question } from "../api/entities";
import { compileQuestions } from "./compiler";

export const getKeystrokesFromQuestions = (questions: Question[] = []) => {
  const compiledQuestions = compileQuestions(questions);

  let maxKeystrokes = 0;
  let minKeystrokes = 0;

  compiledQuestions.forEach(question => {
    question.roman.forEach(romanLine => {
      romanLine.forEach(romanChunk => {
        let maxChunkKeystrokes = 0;
        let minChunkKeystrokes = 0;

        romanChunk.candidates.forEach(candidate => {
          const candidateLength = candidate.length;

          if (candidateLength > maxChunkKeystrokes) {
            maxChunkKeystrokes = candidateLength;
          }
          if (candidateLength < minChunkKeystrokes) {
            minChunkKeystrokes = candidateLength;
          }
        });

        maxKeystrokes += maxChunkKeystrokes;
        minKeystrokes += minChunkKeystrokes;
      });
    });
  });

  return {
    maxKeystrokes,
    minKeystrokes
  };
};
