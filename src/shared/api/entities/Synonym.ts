import { BaseEntityObject, UUID } from "./BaseEntityObject";

export interface Synonym extends BaseEntityObject {
  creatorId?: UUID;
  name: string;
  target: string;
  state: SynonymStatus;
}

export type SynonymStatus = "pending" | "accepted" | "rejected";
