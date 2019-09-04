import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserDiary extends BaseEntityObject {
  userId?: UUID;
  date: number;
  submitCount: number;
  typeCount: number;
  submittedCount: number;
  typedCount: number;
  createCount: number;
  editCount: number;
}
