import * as uuid from "uuid";
import { ExerciseDetail, Question } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";

export const createExerciseDetail = (): SaveParams<ExerciseDetail> => ({
  title: "",
  lang: "ja",
  tags: [],
  description: "",
  rubric: "",
  questions: [],
  comment: "",
  navigationMode: "random"
});

export const createQuestion = (): Question => ({
  id: uuid(),
  format: "plain",
  lang: "",
  value: "",
  comment: ""
});

export const createPlan = (items: Question[]) => {
  const plan = [...Array(items.length).keys()];

  for (let i = plan.length - 1; i >= 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));

    [plan[i], plan[random]] = [plan[random], plan[i]];
  }

  return plan;
};
