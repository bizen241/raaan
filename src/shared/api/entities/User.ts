import { BaseEntityObject, UUID } from "./BaseEntityObject";

export type Permission = "Owner" | "Admin" | "Write" | "Read" | "Guest";

export interface User extends BaseEntityObject {
  name: string;
  permission: Permission;
  accountId: UUID;
  configId: UUID;
  summaryId: UUID;
}
