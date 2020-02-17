import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export interface PlaylistSummary extends BaseEntityObject {
  authorId: EntityId<"User">;
  authorName: string;
  playlistId: EntityId<"Playlist">;
  title: string;
  tags: string;
  description: string;
  itemCount: number;
  submittedCount: number;
  typedCount: number;
  isPrivate: boolean;
  searchSort?: "createdAt";
}
