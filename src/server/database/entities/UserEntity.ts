import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Permission } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserConfigEntity } from "./UserConfigEntity";

@Entity("users")
export class UserEntity extends BaseEntityClass {
  type: "User" = "User";

  @Column()
  name: string;

  @Column()
  permission: Permission;

  @Column("uuid")
  configId: string;

  @OneToOne(() => UserConfigEntity, userConfig => userConfig.user, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "configId"
  })
  config?: UserConfigEntity;

  constructor(name: string, permission: Permission, config: UserConfigEntity) {
    super();

    this.name = name;
    this.permission = permission;
    this.configId = config && config.id;
  }
}
