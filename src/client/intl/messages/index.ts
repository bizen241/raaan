import { Lang } from "../../../shared/api/entities";
import { en } from "./en";
import { ja } from "./ja";

export type Messages = typeof ja;

export const langToMessages: { [P in Lang]: Messages } = {
  en,
  ja
};
