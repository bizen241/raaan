import { Column, Entity, OneToOne, RelationId, Unique } from "typeorm";
import { AuthProviderName } from "../../../shared/auth";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_accounts")
@Unique(["provider", "accountId"])
export class UserAccountEntity extends BaseEntityClass {
  type: "UserAccount" = "UserAccount";

  @OneToOne(() => UserEntity, user => user.account)
  user?: UserEntity;
  @RelationId((account: UserAccountEntity) => account.user)
  userId!: string;

  @Column()
  provider: AuthProviderName;

  @Column()
  accountId: string;

  @Column({
    unique: true
  })
  email: string;

  constructor(provider: AuthProviderName, accountId: string, email: string) {
    super();

    this.provider = provider;
    this.accountId = accountId;
    this.email = email;
  }
}
