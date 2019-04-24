import { ExerciseDetail, Question } from "../../shared/api/entities";
import { createQuestion } from "../domain/content";
import { editBuffer } from "../reducers/buffers";

const updateTitle = (bufferId: string, title: string) =>
  editBuffer<ExerciseDetail>("ExerciseDetail", bufferId, () => ({
    title
  }));

const appendItem = (bufferId: string) =>
  editBuffer<ExerciseDetail>("ExerciseDetail", bufferId, ({ questions = [] }) => {
    return {
      questions: [...questions, createQuestion()]
    };
  });

const updateItem = <P extends keyof Question>(bufferId: string, index: number, key: P, value: Question[P]) =>
  editBuffer<ExerciseDetail>("ExerciseDetail", bufferId, ({ questions = [] }) => {
    const updatedItems = [...questions];
    updatedItems[index] = {
      ...questions[index],
      [key]: value
    };

    return {
      questions: updatedItems
    };
  });

const deleteItem = (bufferId: string, index: number) =>
  editBuffer<ExerciseDetail>("ExerciseDetail", bufferId, ({ questions = [] }) => ({
    questions: [...questions.slice(0, index), ...questions.slice(index + 1)]
  }));

export const contentActions = {
  updateTitle,
  appendItem,
  updateItem,
  deleteItem
};
