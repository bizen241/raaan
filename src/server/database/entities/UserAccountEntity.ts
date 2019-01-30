import { Column, Entity, ManyToOne } from "typeorm";
import { AuthProviderName } from "../../../shared/auth";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity()
export class UserAccountEntity extends BaseEntityClass<"UserAccount"> {
  type: "UserAccount" = "UserAccount";

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Column()
  provider!: AuthProviderName;

  @Column()
  accountId!: string;
}

interface UserAccountConstructor {
  id?: string;
  user: UserEntity;
  provider: AuthProviderName;
  accountId: string;
}

export const createUserAccount = ({ id, user, provider, accountId }: UserAccountConstructor) => {
  const userAccount = new UserAccountEntity();

  if (id !== undefined) {
    userAccount.id = id;
  }

  userAccount.user = user;
  userAccount.provider = provider;
  userAccount.accountId = accountId;

  return userAccount;
};
