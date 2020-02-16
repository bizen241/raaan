import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { AttemptResult, EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { UserEntity } from "./UserEntity";

@Entity("submissions")
export class SubmissionEntity extends BaseEntityClass<"Submission"> {
  readonly type = "Submission";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  submitter?: UserEntity;
  @RelationId((submission: SubmissionEntity) => submission.submitter)
  submitterId!: EntityId<"User">;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((submission: SubmissionEntity) => submission.exercise)
  exerciseId!: EntityId<"Exercise">;

  @Column()
  typeCount!: number;

  @Column()
  time!: number;

  @Column()
  accuracy!: number;

  constructor(submitter: UserEntity, exercise: ExerciseEntity, result: AttemptResult) {
    super();

    this.submitter = submitter;
    this.exercise = exercise;

    if (result !== undefined) {
      this.typeCount = result.typeCount;
      this.time = result.time;
      this.accuracy = result.accuracy;
    }
  }
}
