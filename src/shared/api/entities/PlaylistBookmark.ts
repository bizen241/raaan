import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface PlaylistBookmark extends BaseEntityObject {
  userId?: EntityId<"User">;
  playlistId: EntityId<"Playlist">;
  isPrivate: boolean;
}
