import { ContentItem } from "../../../../../shared/content";
import { KanaItemRenderer } from "./KanaItemRenderer";
import { KanjiItemRenderer } from "./KanjiItemRenderer";
import { TextItemRenderer } from "./TextItemRenderer";

export interface ContentItemRendererProps<T extends ContentItem> {
  item: T;
  untypedSource: string;
  untypedString: string;
  typedLines: string[];
  typedString: string;
  typedSource: string;
  hasTypo: boolean;
}

export const contentItemTypeToRenderer: {
  [T in ContentItem["type"]]: React.FunctionComponent<ContentItemRendererProps<any>>
} = {
  text: TextItemRenderer,
  kana: KanaItemRenderer,
  kanji: KanjiItemRenderer,
  code: KanjiItemRenderer,
  math: KanjiItemRenderer
};
