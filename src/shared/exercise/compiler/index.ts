import { Question } from "../../api/entities";
import { compileToRomanLine, RomanLine } from "./roman";
import { compileToRubyLine, RubyLine } from "./ruby";

export interface CompiledQuestion {
  ruby: RubyLine[];
  roman: RomanLine[];
}

export const compileQuestions = (questions: Question[]) => {
  const compiledQuestions: CompiledQuestion[] = [];

  questions.forEach(question => {
    const sourceLines = question.value.trim().split("\n");

    const rubyLines: RubyLine[] = [];
    sourceLines.forEach(sourceLine => {
      rubyLines.push(compileToRubyLine(sourceLine));
    });

    const romanLines: RomanLine[] = [];
    rubyLines.forEach(rubyLine => {
      romanLines.push(compileToRomanLine(rubyLine));
    });

    compiledQuestions.push({
      ruby: rubyLines,
      roman: romanLines
    });
  });

  return compiledQuestions;
};
