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
