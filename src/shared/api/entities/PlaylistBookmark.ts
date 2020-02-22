import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface PlaylistBookmark extends BaseEntityObject<"PlaylistBookmark"> {
  userId?: EntityId<"User">;
  playlistId: EntityId<"Playlist">;
  isPrivate: boolean;
}
