import { ExerciseItem } from "../../../../../shared/content";
import { KanaItemRenderer } from "./KanaItemRenderer";
import { KanjiItemRenderer } from "./KanjiItemRenderer";
import { TextItemRenderer } from "./TextItemRenderer";

export interface ExerciseItemRendererProps<T extends ExerciseItem> {
  item: T;
  untypedSource: string;
  untypedString: string;
  typedLines: string[];
  typedString: string;
  typedSource: string;
  hasTypo: boolean;
}

export const contentItemTypeToRenderer: {
  [T in ExerciseItem["type"]]: React.FunctionComponent<ExerciseItemRendererProps<any>>
} = {
  text: TextItemRenderer,
  kana: KanaItemRenderer,
  kanji: KanjiItemRenderer,
  code: KanjiItemRenderer,
  math: KanjiItemRenderer
};
