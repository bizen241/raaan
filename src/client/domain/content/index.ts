import * as uuid from "uuid";
import { ExerciseDetail } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { CodeItem, KanaItem, KanjiItem, MathItem, Question, TextItem } from "../../../shared/content";

export const createExerciseDetail = (contentId?: string): SaveParams<ExerciseDetail> => ({
  contentId,
  title: "",
  lang: "ja",
  tags: [],
  description: "",
  rubric: "",
  questions: [],
  comment: "",
  navigationMode: "random"
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

export const contentItemCreators: { [T in Question["type"]]: () => Question } = {
  text: createTextItem,
  kana: createKanaItem,
  kanji: createKanjiItem,
  code: createCodeItem,
  math: createMathItem
};

export const createPlan = (items: Question[]) => {
  const plan = [...Array(items.length).keys()];

  for (let i = plan.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [plan[i], plan[random]] = [plan[random], plan[i]];
  }

  return plan;
};
