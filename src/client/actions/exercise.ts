import { Exercise, Question } from "../../shared/api/entities";
import { createQuestion } from "../domain/exercise/create";
import { editBuffer } from "../reducers/buffers";

const updateTitle = (bufferId: string, title: string) =>
  editBuffer<Exercise>("Exercise", bufferId, () => ({
    title
  }));

const appendQuestion = (bufferId: string) =>
  editBuffer<Exercise>("Exercise", bufferId, ({ questions = [] }) => {
    return {
      questions: [...questions, createQuestion()]
    };
  });

const updateQuestion = <P extends keyof Question>(bufferId: string, index: number, key: P, value: Question[P]) =>
  editBuffer<Exercise>("Exercise", bufferId, ({ questions = [] }) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = {
      ...questions[index],
      [key]: value
    };

    return {
      questions: updatedQuestions
    };
  });

const deleteQuestion = (bufferId: string, index: number) =>
  editBuffer<Exercise>("Exercise", bufferId, ({ questions = [] }) => ({
    questions: [...questions.slice(0, index), ...questions.slice(index + 1)]
  }));

export const exerciseActions = {
  updateTitle,
  appendQuestion,
  updateQuestion,
  deleteQuestion
};
