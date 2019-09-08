import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface PlaylistReport extends BaseEntityObject {
  targetId: UUID;
  reporterId: UUID;
}
