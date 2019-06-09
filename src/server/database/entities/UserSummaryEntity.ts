import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user-summaries")
export class UserSummaryEntity extends BaseEntityClass {
  type: "UserSummary" = "UserSummary";

  @OneToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user?: UserEntity;
  @RelationId((userSummary: UserSummaryEntity) => userSummary.user)
  userId!: string;

  @Column()
  playCount: number = 1;

  constructor() {
    super();
  }
}
