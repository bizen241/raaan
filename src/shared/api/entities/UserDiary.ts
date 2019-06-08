import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface UserDiary extends BaseEntityObject {
  userId: UUID;
  date: string;
  playCount: number;
}
