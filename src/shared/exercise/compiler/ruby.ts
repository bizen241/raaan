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
    .replace(withAnchorRegExp, replaceWithAnnotation)
    .replace(withoutAnchorRegExp, replaceWithAnnotation)
    .split(annotationTerminator)
    .forEach(chunk => {
      const [unrubiedText, rubiedText] = chunk.split(annotationAnchor);

      if (unrubiedText.length > 0) {
        rubyLine.push(
          ...unrubiedText.split("").map(char => ({
            kanji: char,
            isMasked
          }))
        );
      }
      if (rubiedText !== undefined) {
        const [parentText, rubyText] = rubiedText.split(annotationSeparator);

        rubyLine.push({
          kanji: parentText,
          ruby: rubyText,
          isMasked
        });
      }
    });

  return rubyLine;
};

export const withAnchorRegExp = new RegExp(`${rubyAnchor}([一-龠々ヶ]+)${rubySeparator}(.+?)${rubyTerminator}`, "g");
export const withoutAnchorRegExp = new RegExp(`([一-龠々ヶ]+)${rubySeparator}(.+?)${rubyTerminator}`, "g");

export const annotationAnchor = "\ufff9";
export const annotationSeparator = "\ufffa";
export const annotationTerminator = "\ufffb";

export const replaceWithAnnotation = `${annotationAnchor}$1${annotationSeparator}$2${annotationTerminator}`;
