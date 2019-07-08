import { Exercise, Question } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";

export const createExercise = (): SaveParams<Exercise> => ({
  title: "",
  lang: "ja",
  tags: [],
  description: "",
  rubric: "",
  comment: "",
  questions: []
});

export const createQuestion = (id: number): Question => ({
  id,
  format: "plain",
  lang: "",
  value: "",
  comment: ""
});
