import { Column, Entity, OneToMany, OneToOne, RelationId } from "typeorm";
import { Permission } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserSummaryEntity } from "./UserSummaryEntity";

@Entity("users")
export class UserEntity extends BaseEntityClass {
  type: "User" = "User";

  @OneToMany(() => UserAccountEntity, userAccount => userAccount.user, {
    cascade: true
  })
  accounts?: UserAccountEntity[];

  @OneToOne(() => UserConfigEntity, userConfig => userConfig.user, {
    cascade: true
  })
  config?: UserConfigEntity;
  @RelationId((user: UserEntity) => user.config)
  configId!: string;

  @OneToOne(() => UserSummaryEntity, userSummary => userSummary.user, {
    cascade: true
  })
  summary?: UserSummaryEntity;
  @RelationId((user: UserEntity) => user.summary)
  summaryId!: string;

  @Column()
  name: string;

  @Column()
  permission: Permission;

  constructor(
    account: UserAccountEntity,
    config: UserConfigEntity,
    summary: UserSummaryEntity,
    name: string,
    permission: Permission
  ) {
    super();

    if (account !== undefined) {
      this.accounts = [account];
    }
    this.config = config;
    this.summary = summary;
    this.name = name;
    this.permission = permission;
  }
}
