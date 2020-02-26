import { EntityType } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface BaseDiaryEntryObject<T extends EntityType> extends BaseEntityObject<T> {
  date: DateString;
}

export type DateString = string & { __brand: "date" };

export const dateToDateString = (value: Date) =>
  `${formatZerolessValue(value.getFullYear())}-${formatZerolessValue(value.getMonth() + 1)}-${formatZerolessValue(
    value.getDate()
  )}` as DateString;

const formatZerolessValue = (value: number) => (value < 10 ? `0${value}` : value.toString());
