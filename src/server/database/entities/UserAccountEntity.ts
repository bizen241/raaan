import { Column, Entity, JoinColumn, OneToOne, RelationId, Unique } from "typeorm";
import { AvatarType } from "../../../shared/api/entities";
import { AuthProviderName } from "../../../shared/auth";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_accounts")
@Unique(["provider", "accountId"])
export class UserAccountEntity extends BaseEntityClass {
  type: "UserAccount" = "UserAccount";

  @OneToOne(
    () => UserEntity,
    user => user.account,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  user?: UserEntity;
  @RelationId((account: UserAccountEntity) => account.user)
  userId!: string;

  @Column()
  provider: AuthProviderName;

  @Column()
  accountId: string;

  @Column()
  email: string;

  @Column()
  avatar: AvatarType = "identicon";

  constructor(provider: AuthProviderName, accountId: string, email: string) {
    super();

    this.provider = provider;
    this.accountId = accountId;
    this.email = email;
  }
}
