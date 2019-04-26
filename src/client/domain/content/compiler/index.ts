import { ExerciseDetail, Question } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { isHatuon, isKana, isSokuon, isYoon, pairKanaToRomans, singleKanaToRomans } from "./hiragana";

export interface RubyChunk {
  kanji: string;
  ruby?: string;
}
export interface RomanChunk {
  kana: string;
  pointer: number;
  candidates: string[];
}

type RubyLine = RubyChunk[];
type RomanLine = RomanChunk[];

export interface CompiledQuestion {
  ruby: RubyLine[];
  roman: RomanLine[];
}

export const compileQuestions = ({ questions = [] }: SaveParams<ExerciseDetail>) => {
  const compiledQuestions: CompiledQuestion[] = [];

  questions.forEach(question => {
    compiledQuestions.push(compileQuestion(question));
  });

  return compiledQuestions;
};

const compileQuestion = (question: Question): CompiledQuestion => {
  const sourceLines = question.value.split("\n");

  const rubyLines: RubyLine[] = [];
  sourceLines.forEach(sourceLine => {
    const rubyLine: RubyLine = [];

    const interlinearAnnotationChunks = sourceLine.split(/[\ufff9\ufffb]/).filter(value => value.length !== 0);
    interlinearAnnotationChunks.forEach(chunk => {
      const [kanji, ruby] = chunk.split("\ufffa");

      rubyLine.push({
        kanji,
        ruby
      });
    });

    rubyLines.push(rubyLine);
  });

  const romanLines: RomanLine[] = [];

  rubyLines.forEach(rubyLine => {
    const romanLine: RomanLine = [];
    const kanaLine = rubyLine.reduce((kana, chunk) => `${kana}${chunk.ruby || chunk.kanji}`, "");

    let rubyChunkCursor = 0;
    let rubyCursor = 0;
    let kanaLineCursor = 0;
    while (kanaLineCursor < kanaLine.length) {
      const { kana, candidates } = compileChar(kanaLine.slice(kanaLineCursor));
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

    romanLines.push(romanLine);
  });

  return {
    ruby: rubyLines,
    roman: romanLines
  };
};

interface CompiledChunk {
  kana: string;
  candidates: string[];
}

const compileChar = (source: string): CompiledChunk => {
  const firstChar = source[0];

  if (isKana(firstChar)) {
    return compileHiragana(source);
  }

  return {
    kana: firstChar,
    candidates: [firstChar]
  };
};

const compileHiragana = (source: string): CompiledChunk => {
  const firstChar = source[0];
  const secondChar = source[1];

  if (isKana(secondChar)) {
    const pairChar = `${firstChar}${secondChar}`;
    const pairRomans = pairKanaToRomans(pairChar);

    if (pairRomans !== undefined) {
      const candidates = [...pairRomans];

      const firstRomans = singleKanaToRomans(firstChar);
      const secondRomans = singleKanaToRomans(secondChar);

      firstRomans.forEach(firstRoman => {
        secondRomans.forEach(secondRoman => {
          candidates.push(`${firstRoman}${secondRoman}`);
        });
      });

      return {
        kana: pairChar,
        candidates
      };
    } else if (isYoon(source)) {
      return compileYoon(source);
    } else if (isSokuon(source)) {
      return compileSokuon(source);
    } else if (isHatuon(source)) {
      return compileHatuon(source);
    }
  }

  return {
    kana: firstChar,
    candidates: singleKanaToRomans(firstChar)
  };
};

const compileYoon = (source: string): CompiledChunk => {
  const firstChar = source[0];
  const secondChar = source[1];
  const firstRomans = singleKanaToRomans(firstChar);
  const secondRomans = singleKanaToRomans(secondChar);

  const candidates = [`${firstRomans[0][0]}y${secondRomans[0][2]}`];

  firstRomans.forEach(firstRoman => {
    secondRomans.forEach(secondRoman => {
      candidates.push(`${firstRoman}${secondRoman}`);
    });
  });

  return {
    kana: `${firstChar}${secondChar}`,
    candidates
  };
};

const compileSokuon = (source: string): CompiledChunk => {
  const firstChar = source[0];
  const firstRomans = singleKanaToRomans(firstChar);

  const compiledSecondChar = compileHiragana(source.slice(1));

  const candidates: string[] = [];

  compiledSecondChar.candidates.forEach(secondRoman => {
    candidates.push(`${secondRoman[0]}${secondRoman}`);

    firstRomans.forEach(firstRoman => {
      candidates.push(`${firstRoman}${secondRoman}`);
    });
  });

  return {
    kana: `${source[0]}${compiledSecondChar.kana}`,
    candidates
  };
};

const compileHatuon = (source: string): CompiledChunk => {
  const secondChar = source[1];
  const secondRomans = singleKanaToRomans(secondChar);

  const compiledSecondChar = compileHiragana(source.slice(1));

  const candidates: string[] = [];

  const canAbbr = !"あいうえお".includes(secondChar) && !"ny".includes(secondRomans[0][0]);
  const canUseM = "mbp".includes(secondRomans[0][0]);

  compiledSecondChar.candidates.forEach(secondRoman => {
    candidates.push(`nn${secondRoman}`);

    if (canAbbr) {
      candidates.push(`n${secondRoman}`);
    }
    if (canUseM) {
      candidates.push(`m${secondRoman}`);
    }
  });

  return {
    kana: `${source[0]}${compiledSecondChar.kana}`,
    candidates
  };
};
