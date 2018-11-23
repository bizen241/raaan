import { Column, Entity, ManyToOne } from "typeorm";
import { AuthProviderName } from "../../../shared/auth";
import { BaseEntity } from "./BaseEntity";
import { UserEntity } from "./UserEntity";

@Entity()
export class UserAccountEntity extends BaseEntity<"UserAccount"> {
  type: "UserAccount" = "UserAccount";

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column()
  provider!: AuthProviderName;

  @Column()
  accountId!: string;
}

interface AccountConstructor {
  id?: string;
  user: UserEntity;
  provider: AuthProviderName;
  accountId: string;
}

export const createUserAccount = ({ user, provider, accountId }: AccountConstructor) => {
  const account = new UserAccountEntity();

  if (user !== undefined) {
    account.user = user;
  }
  if (provider !== undefined) {
    account.provider = provider;
  }
  if (accountId !== undefined) {
    account.accountId = accountId;
  }

  return account;
};
