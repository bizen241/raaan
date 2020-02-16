import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

@Entity("user_summaries")
export class UserSummaryEntity extends BaseEntityClass<"UserSummary"> {
  readonly type = "UserSummary";

  @OneToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  user?: UserEntity;
  @RelationId((userSummary: UserSummaryEntity) => userSummary.user)
  userId!: EntityId<"User">;

  @Column()
  followerCount: number = 0;

  @Column()
  submitCount: number = 0;

  @Column()
  typeCount: number = 0;

  @Column()
  emailHash: string = "";
}
