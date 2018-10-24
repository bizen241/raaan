import { BaseEntity } from "./BaseEntity";

export type Role = "Owner" | "Admin" | "Write" | "Read";

export interface UserEntity extends BaseEntity<"User"> {
  name: string;
  role: Role;
}
