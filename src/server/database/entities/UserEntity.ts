import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Permission } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserConfigEntity } from "./UserConfigEntity";

@Entity()
export class UserEntity extends BaseEntityClass<"User"> {
  type: "User" = "User";

  @Column()
  name!: string;

  @Column()
  permission!: Permission;

  @OneToOne(() => UserConfigEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  config!: UserConfigEntity;
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
