import { Base } from "./Base";

export type Permission = "Owner" | "Admin" | "Write" | "Read" | "Guest" | "Ghost";

export interface User extends Base<"User"> {
  name: string;
  permission: Permission;
}
