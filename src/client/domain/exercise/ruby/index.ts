import {
  annotationAnchor,
  annotationSeparator,
  annotationTerminator,
  replaceWithAnnotation,
  withAnchorRegExp,
  withoutAnchorRegExp
} from "../../../../shared/exercise/compiler/ruby";
import { rubyAnchor, rubySeparator, rubyTerminator } from "../../../../shared/exercise/ruby/characters";
import { createRubiedTextFromTokens } from "./token";
import { getTokenizer } from "./tokenizer";

export const addRuby = async (inputText: string, callback: (outputText: string) => void) => {
  const tokenizer = await getTokenizer();

  const outputText = inputText
    .replace(withAnchorRegExp, replaceWithAnnotation)
    .replace(withoutAnchorRegExp, replaceWithAnnotation)
    .split(annotationTerminator)
    .map(chunk => {
      const [unrubiedText, rubiedText] = chunk.split(annotationAnchor);

      const tokens = tokenizer.tokenize(removeSpecialCharacters(unrubiedText));
      const processedText = createRubiedTextFromTokens(tokens);

      if (rubiedText === undefined) {
        return processedText;
      }

      const [parentText, rubyText] = rubiedText.split(annotationSeparator);

      if (isKanjiOnly(parentText)) {
        return `${processedText}${parentText}${rubySeparator}${rubyText}${rubyTerminator}`;
      } else {
        return `${processedText}${rubyAnchor}${parentText}${rubySeparator}${rubyText}${rubyTerminator}`;
      }
    })
    .join("");

  callback(outputText);
};

const removeSpecialCharacters = (inputText: string) =>
  inputText
    .replace(rubyAnchor, "")
    .replace(rubySeparator, "")
    .replace(rubyTerminator, "");

const isKanjiOnly = (target: string) => /^[一-龠々ヶ]+$/.test(target);
