import { Column, Entity, OneToOne, RelationId } from "typeorm";
import { Permission } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";

@Entity("users")
export class UserEntity extends BaseEntityClass {
  type: "User" = "User";

  @OneToOne(() => UserAccountEntity, userAccount => userAccount.user)
  account?: UserAccountEntity;
  @RelationId((user: UserEntity) => user.account)
  accountId!: string;

  @OneToOne(() => UserConfigEntity, userConfig => userConfig.user)
  config?: UserConfigEntity;
  @RelationId((user: UserEntity) => user.config)
  configId!: string;

  @Column()
  name: string;

  @Column()
  permission: Permission;

  constructor(name: string, permission: Permission) {
    super();

    this.name = name;
    this.permission = permission;
  }
}
