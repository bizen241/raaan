import { BaseEntity } from "./Base";

export type Permission = "Owner" | "Admin" | "Write" | "Read" | "Guest" | "Ghost";

export interface UserEntity extends BaseEntity<"User"> {
  name: string;
  permission: Permission;
}
