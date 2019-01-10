import * as uuid from "uuid";
import { CodeItem, ContentData, ContentItem, KanjiItem, MathItem, TextItem } from "../../../shared/content";

export const createContentData = (): ContentData => ({
  version: 1,
  title: "無題",
  lang: "ja",
  tags: [],
  items: [],
  comment: "",
  shuffle: false
});

const createTextItem = (): TextItem => ({
  type: "text",
  id: uuid(),
  text: "",
  comment: "",
  lang: "ja"
});

const createKanjiItem = (): KanjiItem => ({
  type: "kanji",
  id: uuid(),
  kanji: "",
  kana: "",
  comment: ""
});

const createCodeItem = (): CodeItem => ({
  type: "code",
  id: uuid(),
  lang: "js",
  code: "",
  comment: ""
});

const createMathItem = (): MathItem => ({
  type: "math",
  id: uuid(),
  formula: "",
  comment: ""
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
