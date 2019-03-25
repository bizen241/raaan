import { ExerciseRevision } from "../../shared/api/entities";
import { Question } from "../../shared/content";
import { contentItemCreators } from "../domain/content";
import { editBuffer } from "../reducers/buffers";

const updateTitle = (bufferId: string, title: string) =>
  editBuffer<ExerciseRevision>("ExerciseRevision", bufferId, () => ({
    title
  }));

const appendItem = (bufferId: string, itemType: Question["type"]) =>
  editBuffer<ExerciseRevision>("ExerciseRevision", bufferId, ({ items = [] }) => ({
    items: [...items, contentItemCreators[itemType]()]
  }));

const updateItem = <P extends keyof Question>(bufferId: string, index: number, key: P, value: Question[P]) =>
  editBuffer<ExerciseRevision>("ExerciseRevision", bufferId, ({ items = [] }) => {
    const updatedItems = [...items];
    updatedItems[index] = {
      ...items[index],
      [key]: value
    };

    return {
      items: updatedItems
    };
  });

const deleteItem = (bufferId: string, index: number) =>
  editBuffer<ExerciseRevision>("ExerciseRevision", bufferId, ({ items = [] }) => ({
    items: [...items.slice(0, index), ...items.slice(index + 1)]
  }));

export const contentActions = {
  updateTitle,
  appendItem,
  updateItem,
  deleteItem
};