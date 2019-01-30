import { BaseEntityObject } from "./BaseEntityObject";

export type Permission = "Owner" | "Admin" | "Write" | "Guest" | "Ghost";

export interface User extends BaseEntityObject {
  name: string;
  permission: Permission;
}
