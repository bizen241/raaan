import { ExerciseDetail } from "../../shared/api/entities";
import { Question } from "../../shared/content";
import { contentItemCreators } from "../domain/content";
import { editBuffer } from "../reducers/buffers";

const updateTitle = (bufferId: string, title: string) =>
  editBuffer<ExerciseDetail>("ExerciseDetail", bufferId, () => ({
    title
  }));

const appendItem = (bufferId: string, itemType: Question["type"]) =>
  editBuffer<ExerciseDetail>("ExerciseDetail", bufferId, ({ questions = [] }) => ({
    questions: [...questions, contentItemCreators[itemType]()]
  }));

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
