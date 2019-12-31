import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistDiary extends BaseEntityObject {
  playlistId?: UUID;
  date: string;
  submittedCount: number;
  typedCount: number;
}
