import { Column, Entity } from "typeorm";
import { Permission } from "../../../shared/api/entities";
import { BaseEntity, BaseEntityConstructor } from "./BaseEntity";

interface UserConstructor extends BaseEntityConstructor {
  name: string;
  permission: Permission;
}

@Entity()
export class UserEntity extends BaseEntity<"User"> {
  type: "User" = "User";

  @Column()
  name!: string;

  @Column()
  permission!: Permission;

  constructor({ id, name, permission }: Partial<UserConstructor> = {}) {
    super(id);

    if (name !== undefined) {
      this.name = name;
    }
    if (permission !== undefined) {
      this.permission = permission;
    }
  }
}

export const createUser = (params: UserConstructor) => new UserEntity(params);
