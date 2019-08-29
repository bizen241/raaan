import { pairHiraganaToRomans, singleHiraganaToRomans } from "./hiragana";
import { convertSymbols } from "./symbol";

export interface CompiledChunk {
  kana: string;
  candidates: string[];
}

const isHiragana = (char: string) => /[\u3041-\u3096]/.test(char);
const isKatakana = (char: string) => /[\u30a1-\u30f6]/.test(char);
const isKana = (char: string) => isHiragana(char) || isKatakana(char);

export const convertKatakanaToHiragana = (target: string) =>
  target.replace(/[\u30a1-\u30f6]/g, matched => String.fromCharCode(matched.charCodeAt(0) - 0x60));

export const compileKana = (source: string): CompiledChunk => {
  const firstChar = source[0];

  if (isKana(firstChar)) {
    return compileHiragana(convertKatakanaToHiragana(source));
  }

  const hankaku = convertSymbols(firstChar);
  const lowercase = hankaku.toLowerCase();

  return {
    kana: firstChar,
    candidates: [lowercase]
  };
};

const compileHiragana = (source: string): CompiledChunk => {
  const firstChar = source[0];
  const secondChar = source[1];

  if (isHiragana(secondChar)) {
    const pairChar = `${firstChar}${secondChar}`;
    const pairRomans = pairHiraganaToRomans[pairChar];

    if (pairRomans !== undefined) {
      const candidates = [...pairRomans];

      const firstRomans = singleHiraganaToRomans[firstChar];
      const secondRomans = singleHiraganaToRomans[secondChar];

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
    candidates: singleHiraganaToRomans[firstChar]
  };
};

const isYoon = (source: string) => "きにひみりぎぢびぴ".includes(source[0]) && "ゃゅょ".includes(source[1]);
const isSokuon = (source: string) => source[0] === "っ";
const isHatuon = (source: string) => source[0] === "ん";

const compileYoon = (source: string): CompiledChunk => {
  const firstChar = source[0];
  const secondChar = source[1];
  const firstRomans = singleHiraganaToRomans[firstChar];
  const secondRomans = singleHiraganaToRomans[secondChar];

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
  const firstRomans = singleHiraganaToRomans[firstChar];

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
  const secondRomans = singleHiraganaToRomans[secondChar];

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
