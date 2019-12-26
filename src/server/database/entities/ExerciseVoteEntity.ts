import { Entity, ManyToOne } from "typeorm";
import { BaseVoteClass } from "./BaseVoteClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercise_votes")
export class ExerciseVoteEntity extends BaseVoteClass<ExerciseEntity> {
  type: "ExerciseVote" = "ExerciseVote";

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseEntity;

  constructor(target: ExerciseEntity, voter: UserEntity, isUp: boolean) {
    super(voter, isUp);

    this.target = target;
  }
}
