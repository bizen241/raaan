import { ContentItem } from "../../../../../shared/content";
import { KanaItemEditor } from "./KanaItemEditor";
import { KanjiItemEditor } from "./KanjiItemEditor";
import { TextItemEditor } from "./TextItemEditor";

export const contentItemTypeToLabel: { [T in ContentItem["type"]]: string } = {
  code: "コード",
  kana: "かな",
  kanji: "漢字",
  math: "数式",
  text: "テキスト"
};

export type TextAreaChangeEvent = React.ChangeEvent<HTMLTextAreaElement>;

export interface ContentItemEditorProps<T extends ContentItem> {
  item: T;
  onChange: <P extends keyof T>(key: P, value: T[P]) => void;
}

export const contentItemEditors: {
  [T in ContentItem["type"]]: React.FunctionComponent<ContentItemEditorProps<any>>
} = {
  text: TextItemEditor,
  kana: KanaItemEditor,
  kanji: KanjiItemEditor,
  code: TextItemEditor,
  math: TextItemEditor
};
