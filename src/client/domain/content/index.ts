import * as uuid from "uuid";
import { ContentData, TextItem } from "../../../shared/content";

export const createContentData = (): ContentData => ({
  version: 1,
  title: "無題",
  lang: "ja",
  tags: [],
  items: [],
  comment: "",
  shuffle: false
});

export const createTextItem = (): TextItem => ({
  type: "text",
  id: uuid(),
  value: "",
  comment: "",
  lang: "ja",
  display: ""
});

export const createPlan = (data: ContentData) => {
  const plan = [...Array(data.items.length).keys()];

  for (let i = plan.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [plan[i], plan[random]] = [plan[random], plan[i]];
  }

  return plan;
};
