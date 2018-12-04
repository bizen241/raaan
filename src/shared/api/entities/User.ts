import { BaseObject } from "./BaseObject";

export type Permission = "Owner" | "Admin" | "Write" | "Read" | "Guest" | "Ghost";

export interface User extends BaseObject<"User"> {
  name: string;
  permission: Permission;
}
