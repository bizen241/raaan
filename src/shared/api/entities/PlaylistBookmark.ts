import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistBookmark extends BaseEntityObject {
  userId?: UUID;
  playlistId: UUID;
  isPrivate: boolean;
}
