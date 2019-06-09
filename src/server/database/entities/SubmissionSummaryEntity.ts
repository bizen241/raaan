import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { UserEntity } from "./UserEntity";

@Entity("submission-summaries")
export class SubmissionSummaryEntity extends BaseEntityClass {
  type: "SubmissionSummary" = "SubmissionSummary";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  user?: UserEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.user)
  userId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.exercise)
  exerciseId!: string;

  @Column()
  averageTime: number;

  @Column()
  averageAccuracy: number;

  @Column()
  playCount: number = 1;

  constructor(user: UserEntity, exercise: ExerciseEntity, averageTime: number, averageAccuracy: number) {
    super();

    this.user = user;
    this.exercise = exercise;
    this.averageTime = averageTime;
    this.averageAccuracy = averageAccuracy;
  }
}
