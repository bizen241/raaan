import * as uuid from "uuid";
import { ContentRevision } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { CodeItem, ContentItem, KanaItem, KanjiItem, MathItem, TextItem } from "../../../shared/content";

export type ContentRevisionParams = Required<SaveParams<ContentRevision>>;

export const createContentRevision = (contentId: string): ContentRevisionParams => ({
  contentId,
  title: "",
  lang: "ja",
  tags: [],
  items: [],
  summary: "",
  comment: "",
  isLinear: false
});

const base = <T extends string>(type: T) => ({
  type: type as T,
  id: uuid(),
  value: "",
  comment: ""
});

const createTextItem = (): TextItem => ({
  ...base("text"),
  lang: "ja"
});

const createKanaItem = (): KanaItem => ({
  ...base("kana")
});

const createKanjiItem = (): KanjiItem => ({
  ...base("kanji"),
  kanji: ""
});

const createCodeItem = (): CodeItem => ({
  ...base("code"),
  lang: "js"
});

const createMathItem = (): MathItem => ({
  ...base("math")
});

export const contentItemCreators: { [T in ContentItem["type"]]: () => ContentItem } = {
  text: createTextItem,
  kana: createKanaItem,
  kanji: createKanjiItem,
  code: createCodeItem,
  math: createMathItem
};

export const createPlan = (content: ContentRevisionParams) => {
  const plan = [...Array(content.items.length).keys()];

  for (let i = plan.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [plan[i], plan[random]] = [plan[random], plan[i]];
  }

  return plan;
};
