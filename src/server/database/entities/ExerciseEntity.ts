import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseDraftEntity } from "./ExerciseDraftEntity";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { RevisionEntity } from "./RevisionEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercises")
export class ExerciseEntity extends BaseEntityClass<"Exercise"> {
  readonly type = "Exercise";

  @OneToOne(() => ExerciseSummaryEntity, (exerciseSummary) => exerciseSummary.exercise, {
    cascade: true,
  })
  summary?: ExerciseSummaryEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.summary)
  summaryId!: EntityId<"ExerciseSummary">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  author?: UserEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.author)
  authorId!: EntityId<"User">;

  @OneToOne(() => RevisionEntity, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  latest?: RevisionEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.latest)
  latestId!: EntityId<"Revision">;

  @OneToOne(() => ExerciseDraftEntity, (exerciseDraft) => exerciseDraft.exercise, {
    cascade: true,
  })
  draft?: ExerciseDraftEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.draft)
  draftId!: EntityId<"ExerciseDraft">;

  @Column()
  isDraft: boolean = true;

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;

  constructor(summary: ExerciseSummaryEntity, author: UserEntity, draft: ExerciseDraftEntity) {
    super();

    this.summary = summary;
    this.author = author;
    this.draft = draft;
  }
}
