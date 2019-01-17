import { ContentItem } from "../../../../../shared/content";
import { KanjiItemRenderer } from "./KanjiItemRenderer";

export interface ContentItemRendererProps<T extends ContentItem> {
  item: T;
  untypedSource: string;
  untypedString: string;
  typedLines: string[];
  typedString: string;
  typedSource: string;
}

export const contentItemTypeToRenderer: {
  [T in ContentItem["type"]]: React.FunctionComponent<ContentItemRendererProps<any>>
} = {
  text: KanjiItemRenderer,
  kanji: KanjiItemRenderer,
  code: KanjiItemRenderer,
  math: KanjiItemRenderer
};
