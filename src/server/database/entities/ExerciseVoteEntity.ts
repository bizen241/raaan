import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { ExerciseEntity, UserEntity } from ".";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("exercise-votes")
export class ExerciseVoteEntity extends BaseEntityClass {
  type: "ExerciseVote" = "ExerciseVote";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseEntity;
  @RelationId((exerciseVote: ExerciseVoteEntity) => exerciseVote.target)
  targetId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  voter?: UserEntity;
  @RelationId((exerciseVote: ExerciseVoteEntity) => exerciseVote.voter)
  voterId!: string;

  @Column()
  isUp: boolean;

  constructor(target: ExerciseEntity, voter: UserEntity, isUp: boolean) {
    super();

    this.target = target;
    this.voter = voter;
    this.isUp = isUp;
  }
}
