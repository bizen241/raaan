import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Playlist extends BaseEntityObject {
  authorId: UUID;
  title: string;
  description: string;
  isPrivate: boolean;
}
