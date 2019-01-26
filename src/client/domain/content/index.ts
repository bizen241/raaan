import * as uuid from "uuid";
import { CodeItem, ContentData, ContentItem, KanjiItem, MathItem, TextItem } from "../../../shared/content";

export const createContentData = (): ContentData => ({
  version: 1,
  title: "無題",
  lang: "ja",
  tags: [],
  items: [],
  summary: "",
  comment: "",
  shuffle: false
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
  kanji: createKanjiItem,
  code: createCodeItem,
  math: createMathItem
};

export const createPlan = (data: ContentData) => {
  const plan = [...Array(data.items.length).keys()];

  for (let i = plan.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [plan[i], plan[random]] = [plan[random], plan[i]];
  }

  return plan;
};
