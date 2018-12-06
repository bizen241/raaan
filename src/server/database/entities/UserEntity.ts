import { Column, Entity } from "typeorm";
import { Permission } from "../../../shared/api/entities";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class UserEntity extends BaseEntity<"User"> {
  type: "User" = "User";

  @Column()
  name!: string;

  @Column()
  permission!: Permission;
}

interface UserConstructor {
  id?: string;
  name: string;
  permission: Permission;
}

export const createUser = ({ id, name, permission }: UserConstructor) => {
  const user = new UserEntity();

  if (id !== undefined) {
    user.id = id;
  }

  user.name = name;
  user.permission = permission;

  return user;
};
