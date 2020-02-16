import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercise_votes")
export class ExerciseVoteEntity extends BaseEntityClass<"ExerciseVote"> {
  readonly type = "ExerciseVote";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  voter?: UserEntity;
  @RelationId((exerciseVote: ExerciseVoteEntity) => exerciseVote.voter)
  voterId!: EntityId<"User">;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseEntity;
  @RelationId((exerciseVote: ExerciseVoteEntity) => exerciseVote.target)
  targetId!: EntityId<"Exercise">;

  @Column()
  isUp: boolean;

  constructor(target: ExerciseEntity, voter: UserEntity, isUp: boolean) {
    super();

    this.voter = voter;
    this.target = target;
    this.isUp = isUp;
  }
}
