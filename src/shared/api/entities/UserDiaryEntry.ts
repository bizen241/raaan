import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserDiaryEntry extends BaseEntityObject {
  userId?: UUID;
  date: string;
  submitCount: number;
  typeCount: number;
  submittedCount: number;
  typedCount: number;
  createCount: number;
  editCount: number;
}
