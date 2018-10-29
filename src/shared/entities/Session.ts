import { BaseEntity } from "./Base";

export interface SessionEntity extends BaseEntity<"Session"> {
  userAgent: string;
}
