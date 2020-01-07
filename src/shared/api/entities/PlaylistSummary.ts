import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistSummary extends BaseEntityObject {
  authorId: UUID;
  authorName: string;
  playlistId: UUID;
  title: string;
  tags: string;
  description: string;
  itemCount: number;
  submittedCount: number;
  typedCount: number;
  isPrivate: boolean;
  searchSort?: "createdAt";
}
