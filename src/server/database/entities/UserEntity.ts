import { Column, Entity } from "typeorm";
import { Role } from "../../../shared/entities";
import { BaseEntity, BaseEntityConstructor } from "./BaseEntity";

interface UserConstructor extends BaseEntityConstructor {
  name: string;
  role: Role;
}

@Entity("users")
export class UserEntity extends BaseEntity<"User"> {
  type: "User" = "User";

  @Column()
  name!: string;

  @Column()
  role!: Role;

  constructor({ id, name, role }: Partial<UserConstructor> = {}) {
    super(id);

    if (name !== undefined) {
      this.name = name;
    }
    if (role !== undefined) {
      this.role = role;
    }
  }
}

export const createUser = (params: UserConstructor) => new UserEntity(params);
