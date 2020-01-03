import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistDiaryEntry extends BaseEntityObject {
  playlistId?: UUID;
  date: string;
  submittedCount: number;
  typedCount: number;
}
