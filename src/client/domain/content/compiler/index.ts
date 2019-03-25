import { ExerciseRevision } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { ContentItem } from "../../../../shared/content";
import { isHatuon, isKana, isSokuon, isYoon, pairKanaToRomans, singleKanaToRomans } from "./hiragana";

export type CompiledChar = {
  source: string;
  compiled: string[];
};
export type CompiledLine = CompiledChar[];
export type CompiledItem = CompiledLine[];

export const compileContent = ({ items = [] }: SaveParams<ExerciseRevision>) => {
  const compiledItems: CompiledItem[] = [];

  items.forEach(item => {
    compiledItems.push(compileItem(item));
  });

  return compiledItems;
};

const sanitize = (value: string) => {
  value = value.replace(/ー/g, "-");

  return value;
};

const compileItem = (item: ContentItem) => {
  const compiledItem: CompiledItem = [];

  const sanitizedLines = sanitize(item.value).split("\n");

  sanitizedLines.forEach(line => {
    const compiledLine: CompiledLine = [];

    let i = 0;
    while (i < line.length) {
      const compiledChar = compileChar(line.slice(i));

      i = i + compiledChar.source.length;

      compiledLine.push(compiledChar);
    }

    compiledItem.push(compiledLine);
  });

  return compiledItem;
};

const compileChar = (source: string): CompiledChar => {
  const firstChar = source[0];

  if (isKana(firstChar)) {
    return compileHiragana(source);
  }

  return {
    source: firstChar,
    compiled: [firstChar]
  };
};

const compileHiragana = (source: string): CompiledChar => {
  const firstChar = source[0];
  const secondChar = source[1];

  if (isKana(secondChar)) {
    const pairChar = `${firstChar}${secondChar}`;
    const pairRomans = pairKanaToRomans(pairChar);

    if (pairRomans !== undefined) {
      const compiled = [...pairRomans];

      const firstRomans = singleKanaToRomans(firstChar);
      const secondRomans = singleKanaToRomans(secondChar);

      firstRomans.forEach(firstRoman => {
        secondRomans.forEach(secondRoman => {
          compiled.push(`${firstRoman}${secondRoman}`);
        });
      });

      return {
        source: pairChar,
        compiled
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
    source: firstChar,
    compiled: [...singleKanaToRomans(firstChar)]
  };
};

const compileYoon = (source: string): CompiledChar => {
  const firstChar = source[0];
  const secondChar = source[1];
  const firstRomans = singleKanaToRomans(firstChar);
  const secondRomans = singleKanaToRomans(secondChar);

  const compiled = [`${firstRomans[0][0]}y${secondRomans[0][2]}`];

  firstRomans.forEach(firstRoman => {
    secondRomans.forEach(secondRoman => {
      compiled.push(`${firstRoman}${secondRoman}`);
    });
  });

  return {
    source: `${firstChar}${secondChar}`,
    compiled
  };
};

const compileSokuon = (source: string): CompiledChar => {
  const firstChar = source[0];
  const firstRomans = singleKanaToRomans(firstChar);

  const compiledSecondChar = compileHiragana(source.slice(1));

  const compiled: string[] = [];

  compiledSecondChar.compiled.forEach(secondRoman => {
    compiled.push(`${secondRoman[0]}${secondRoman}`);

    firstRomans.forEach(firstRoman => {
      compiled.push(`${firstRoman}${secondRoman}`);
    });
  });

  return {
    source: `${source[0]}${compiledSecondChar.source}`,
    compiled
  };
};

const compileHatuon = (source: string): CompiledChar => {
  const secondChar = source[1];
  const secondRomans = singleKanaToRomans(secondChar);

  const compiledSecondChar = compileHiragana(source.slice(1));

  const compiled: string[] = [];

  const canAbbr = !"あいうえお".includes(secondChar) && !"ny".includes(secondRomans[0][0]);
  const canUseM = "mbp".includes(secondRomans[0][0]);

  compiledSecondChar.compiled.forEach(secondRoman => {
    compiled.push(`nn${secondRoman}`);

    if (canAbbr) {
      compiled.push(`n${secondRoman}`);
    }
    if (canUseM) {
      compiled.push(`m${secondRoman}`);
    }
  });

  return {
    source: `${source[0]}${compiledSecondChar.source}`,
    compiled
  };
};
