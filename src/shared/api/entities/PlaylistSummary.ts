import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistSummary extends BaseEntityObject {
  authorId: UUID;
  playlistId: UUID;
  title: string;
  tags: string;
  description: string;
  itemCount: number;
  isPrivate: boolean;
}
