import { Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { ExerciseDetailClass } from "./ExerciseDetailClass";
import { ExerciseRevisionEntity } from "./ExerciseRevisionEntity";

@Entity("exercise_revision_details")
export class ExerciseRevisionDetailEntity extends ExerciseDetailClass {
  type: "ExerciseRevisionDetail" = "ExerciseRevisionDetail";

  @OneToOne(() => ExerciseRevisionEntity, exerciseRevision => exerciseRevision.detail, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn()
  revision?: ExerciseRevisionEntity;
  @RelationId((exerciseRevisionDetail: ExerciseRevisionDetailEntity) => exerciseRevisionDetail.revision)
  revisionId!: string;
}
