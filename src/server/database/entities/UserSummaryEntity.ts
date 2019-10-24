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
  submitCount: number = 0;

  @Column()
  followerCount: number = 0;

  @Column()
  typeCount: number = 0;

  constructor() {
    super();
  }
}
