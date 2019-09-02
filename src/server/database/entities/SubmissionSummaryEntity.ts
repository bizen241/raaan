import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { SubmissionEntity } from "./SubmissionEntity";
import { UserEntity } from "./UserEntity";

@Entity("submission-summaries")
export class SubmissionSummaryEntity extends BaseEntityClass {
  type: "SubmissionSummary" = "SubmissionSummary";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  submitter?: UserEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.submitter)
  submitterId!: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  exercise?: ExerciseEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.exercise)
  exerciseId!: string;

  @OneToOne(() => SubmissionEntity, {
    cascade: true
  })
  @JoinColumn()
  latest?: SubmissionEntity;
  @RelationId((submissionSummary: SubmissionSummaryEntity) => submissionSummary.latest)
  latestId!: string;

  @Column()
  submitCount: number = 1;

  constructor(submitter: UserEntity, exercise: ExerciseEntity, submission: SubmissionEntity) {
    super();

    this.submitter = submitter;
    this.exercise = exercise;
    this.latest = submission;
  }
}
