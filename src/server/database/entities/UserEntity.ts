import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Permission } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";

@Entity("users")
export class UserEntity extends BaseEntityClass {
  type: "User" = "User";

  @Column()
  name: string;

  @Column()
  permission: Permission;

  @Column("uuid")
  accountId: string;

  @OneToOne(() => UserAccountEntity, userAccount => userAccount.user, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "accountId"
  })
  account?: UserAccountEntity;

  @Column("uuid")
  configId: string;

  @OneToOne(() => UserConfigEntity, userConfig => userConfig.user, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "configId"
  })
  config?: UserConfigEntity;

  constructor(name: string, permission: Permission, account: UserAccountEntity, config: UserConfigEntity) {
    super();

    this.name = name;
    this.permission = permission;
    this.accountId = account && account.id;
    this.configId = config && config.id;
  }
}
