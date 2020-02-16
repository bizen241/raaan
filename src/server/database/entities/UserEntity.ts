import { Column, Entity, OneToOne, RelationId } from "typeorm";
import { Permission, EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserAccountEntity } from "./UserAccountEntity";
import { UserConfigEntity } from "./UserConfigEntity";
import { UserSummaryEntity } from "./UserSummaryEntity";

@Entity("users")
export class UserEntity extends BaseEntityClass<"User"> {
  readonly type = "User";

  @OneToOne(
    () => UserAccountEntity,
    userAccount => userAccount.user,
    {
      cascade: true
    }
  )
  account?: UserAccountEntity;
  @RelationId((user: UserEntity) => user.account)
  accountId!: EntityId<"UserAccount">;

  @OneToOne(
    () => UserConfigEntity,
    userConfig => userConfig.user,
    {
      cascade: true
    }
  )
  config?: UserConfigEntity;
  @RelationId((user: UserEntity) => user.config)
  configId!: EntityId<"UserConfig">;

  @OneToOne(
    () => UserSummaryEntity,
    userSummary => userSummary.user,
    {
      cascade: true
    }
  )
  summary?: UserSummaryEntity;
  @RelationId((user: UserEntity) => user.summary)
  summaryId!: EntityId<"UserSummary">;

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

    this.account = account;
    this.config = config;
    this.summary = summary;
    this.name = name;
    this.permission = permission;
  }
}
