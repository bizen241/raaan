import { BaseEntityObject, UUID } from "./BaseEntityObject";

export type NavigationMode = "sequential" | "random";

export interface Exercise extends BaseEntityObject {
  authorId: UUID;
  summaryId: UUID;
  lang: string;
  title: string;
  tags: string[];
  description: string;
  rubric: string;
  comment: string;
  questions: Question[];
  isPrivate: boolean;
  isLocked: boolean;
}

export type Question = TraceQuestion | FillQuestion | InputQuestion | FlipQuestion | SelectQuestion | OrderQuestion;

export type QuestionType = Question["type"];

interface BaseQuestion {
  id: number;
  lang: string;
  rubric: string;
  comment: string;
}

export interface TraceQuestion extends BaseQuestion {
  type: "Trace";
  value: string;
  format: "plain" | "code" | "math";
}

export interface FillQuestion extends BaseQuestion {
  type: "Fill";
  value: string;
}

export interface InputQuestion extends BaseQuestion {
  type: "Input";
  value: string;
  answer: string;
}

export interface FlipQuestion extends BaseQuestion {
  type: "Flip";
  front: {
    lang: string;
    value: string;
  };
  back: {
    lang: string;
    value: string;
  };
}

export interface SelectQuestion extends BaseQuestion {
  type: "Select";
  items: string[];
  answer: number;
}

export interface OrderQuestion extends BaseQuestion {
  type: "Order";
  items: string[];
}
