import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { AuthProviderName } from "../../../shared/auth";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity()
export class UserAccountEntity extends BaseEntityClass {
  type: "UserAccount" = "UserAccount";

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "userId"
  })
  user?: UserEntity;

  @Column()
  provider: AuthProviderName;

  @Column()
  accountId: string;

  constructor(user: UserEntity, provider: AuthProviderName, accountId: string) {
    super();

    this.userId = user && user.id;
    this.provider = provider;
    this.accountId = accountId;
  }
}
