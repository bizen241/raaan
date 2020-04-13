import { maskAnchor, maskTerminator } from "../mask/characters";
import { rubyAnchor, rubySeparator, rubyTerminator } from "../ruby/characters";

export interface RubyChunk {
  kanji: string;
  ruby?: string;
  isMasked: boolean;
}

export type RubyLine = RubyChunk[];

export const compileToRubyLine = (sourceLine: string) => {
  const rubyLine: RubyLine = [];

  sourceLine.split(maskTerminator).forEach((chunk) => {
    const [normal, masked] = chunk.split(maskAnchor);

    if (normal.length > 0) {
      rubyLine.push(...compileToRubyChunks(normal, false));
    }
    if (masked !== undefined) {
      rubyLine.push(...compileToRubyChunks(masked, true));
    }
  });

  return rubyLine;
};

const compileToRubyChunks = (sourceChunk: string, isMasked: boolean) => {
  const rubyLine: RubyLine = [];

  sourceChunk
    .replace(rubyWithAnchorRegExp, annotationWithAnchor)
    .replace(rubyWithoutAnchorRegExp, annotationWithAnchor)
    .split(annotationTerminator)
    .forEach((chunk) => {
      const [unrubiedText, rubiedText] = chunk.split(annotationAnchor);

      if (unrubiedText.length > 0) {
        rubyLine.push(
          ...unrubiedText.split("").map((char) => ({
            kanji: char,
            isMasked,
          }))
        );
      }
      if (rubiedText !== undefined) {
        const [parentText, rubyText] = rubiedText.split(annotationSeparator);

        rubyLine.push({
          kanji: parentText,
          ruby: rubyText,
          isMasked,
        });
      }
    });

  return rubyLine;
};

const kanjiRange = "一-龠々ヶ";
const hiraganaRange = "ぁ-んー";

export const rubyWithAnchorRegExp = new RegExp(
  `${rubyAnchor}([${hiraganaRange}${kanjiRange}]+)${rubySeparator}([${hiraganaRange}]+)${rubyTerminator}`,
  "g"
);
export const rubyWithoutAnchorRegExp = new RegExp(
  `([${kanjiRange}]+)${rubySeparator}([${hiraganaRange}]+)${rubyTerminator}`,
  "g"
);

export const annotationAnchor = "\ufff9";
export const annotationSeparator = "\ufffa";
export const annotationTerminator = "\ufffb";

export const annotationWithAnchor = `${annotationAnchor}$1${annotationSeparator}$2${annotationTerminator}`;
export const annotationWithoutAnchor = `$1${annotationSeparator}$2${annotationTerminator}`;

const kanjiRegExp = new RegExp(`^[${kanjiRange}]+$`);

export const isKanjiOnly = (target: string) => kanjiRegExp.test(target);
