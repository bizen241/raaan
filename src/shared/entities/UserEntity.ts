import { BaseEntity } from "./BaseEntity";

export type Permission = "Owner" | "Admin" | "Write" | "Read";

export interface UserEntity extends BaseEntity<"User"> {
  name: string;
  permission: Permission;
}
