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

  sourceLine.split(maskTerminator).forEach(chunk => {
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
    .replace(withAnchorRegExp, replacedWithAnnotation)
    .replace(withoutAnchorRegExp, replacedWithAnnotation)
    .split(annotationTerminator)
    .forEach(chunk => {
      const [normal, rubied] = chunk.split(annotationAnchor);

      if (normal.length > 0) {
        rubyLine.push(
          ...normal.split("").map(char => ({
            kanji: char,
            isMasked
          }))
        );
      }
      if (rubied !== undefined) {
        const [kanji, ruby] = rubied.split(annotationSeparator);

        if (kanji.length > 0 && ruby !== undefined) {
          rubyLine.push({
            kanji,
            ruby,
            isMasked
          });
        }
      }
    });

  return rubyLine;
};

const withAnchorRegExp = new RegExp(`${rubyAnchor}([一-龠々ヶ]+)${rubySeparator}(.+?)${rubyTerminator}`, "g");
const withoutAnchorRegExp = new RegExp(`([一-龠々ヶ]+)${rubySeparator}(.+?)${rubyTerminator}`, "g");

const annotationAnchor = "\ufff9";
const annotationSeparator = "\ufffa";
const annotationTerminator = "\ufffb";

const replacedWithAnnotation = `${annotationAnchor}$1${annotationSeparator}$2${annotationTerminator}`;
