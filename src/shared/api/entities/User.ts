import { EntityId } from ".";
import { BaseEntityObject } from "./BaseEntityObject";

export type Permission = "Owner" | "Admin" | "Write" | "Read" | "Guest";

export interface User extends BaseEntityObject<"User"> {
  name: string;
  permission: Permission;
  summaryId: EntityId<"UserSummary">;
}
