import { Question } from "../../../../../shared/content";
import { KanaItemRenderer } from "./KanaItemRenderer";
import { KanjiItemRenderer } from "./KanjiItemRenderer";
import { TextItemRenderer } from "./TextItemRenderer";

export interface QuestionRendererProps<T extends Question> {
  item: T;
  untypedSource: string;
  untypedString: string;
  typedLines: string[];
  typedString: string;
  typedSource: string;
  hasTypo: boolean;
}

export const contentItemTypeToRenderer: {
  [T in Question["type"]]: React.FunctionComponent<QuestionRendererProps<any>>
} = {
  text: TextItemRenderer,
  kana: KanaItemRenderer,
  kanji: KanjiItemRenderer,
  code: KanjiItemRenderer,
  math: KanjiItemRenderer
};
