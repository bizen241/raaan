import { BaseEntity } from "./BaseEntity";

export interface SessionEntity extends BaseEntity<"Session"> {
  userAgent: string;
}
