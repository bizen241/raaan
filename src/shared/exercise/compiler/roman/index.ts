import { RubyLine } from "../ruby";
import { compileKana } from "./kana";

export interface RomanChunk {
  kana: string;
  pointer: number;
  candidates: string[];
}

export type RomanLine = RomanChunk[];

export const compileToRomanLine = (rubyLine: RubyLine) => {
  const romanLine: RomanLine = [];
  const kanaLine = rubyLine.reduce((kana, chunk) => `${kana}${chunk.ruby || chunk.kanji}`, "");

  let rubyChunkCursor = 0;
  let rubyCursor = 0;
  let kanaLineCursor = 0;
  while (kanaLineCursor < kanaLine.length) {
    const { kana, candidates } = compileKana(kanaLine.slice(kanaLineCursor));
    const kanaLength = kana.length;

    let kanaCursor = 0;
    while (kanaCursor < kanaLength) {
      const rubyChunk = rubyLine[rubyChunkCursor];
      const ruby = rubyChunk.ruby || rubyChunk.kanji;

      const remainingRubyLength = ruby.length - rubyCursor;
      const remainingKanaLength = kanaLength - kanaCursor;

      if (remainingRubyLength < remainingKanaLength) {
        rubyChunkCursor += 1;
        rubyCursor = 0;
      } else {
        rubyCursor += remainingKanaLength;
      }

      kanaCursor += remainingRubyLength;
    }

    kanaLineCursor += kanaLength;

    romanLine.push({
      kana,
      pointer: rubyChunkCursor,
      candidates
    });
  }

  return romanLine;
};
