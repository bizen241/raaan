import { Column, Entity, ManyToOne } from "typeorm";
import { AuthProviderName } from "../../../shared/auth";
import { BaseEntity, BaseEntityConstructor } from "./BaseEntity";
import { UserEntity } from "./UserEntity";

interface AccountConstructor extends BaseEntityConstructor {
  user: UserEntity;
  provider: AuthProviderName;
  accountId: string;
}

@Entity()
export class AccountEntity extends BaseEntity<"UserAccount"> {
  type: "UserAccount" = "UserAccount";

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column()
  provider!: AuthProviderName;

  @Column()
  accountId!: string;

  constructor({ id, user, provider, accountId }: Partial<AccountConstructor> = {}) {
    super(id);

    if (user !== undefined) {
      this.user = user;
    }
    if (provider !== undefined) {
      this.provider = provider;
    }
    if (accountId !== undefined) {
      this.accountId = accountId;
    }
  }
}

export const createAccount = (params: AccountConstructor) => new AccountEntity(params);
