import { ContentItem } from "../../../../../shared/content";

export const contentItemTypeToLabel: { [T in ContentItem["type"]]: string } = {
  code: "コード",
  kana: "かな",
  kanji: "漢字",
  math: "数式",
  text: "テキスト"
};
