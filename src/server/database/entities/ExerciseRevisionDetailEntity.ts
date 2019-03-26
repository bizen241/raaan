import { Entity, OneToOne } from "typeorm";
import { ExerciseDetailClass } from "./ExerciseDetailClass";
import { ExerciseRevisionEntity } from "./ExerciseRevisionEntity";

@Entity("exercise_revision_details")
export class ExerciseRevisionDetailEntity extends ExerciseDetailClass {
  type: "ExerciseRevisionDetail" = "ExerciseRevisionDetail";

  @OneToOne(() => ExerciseRevisionEntity, contentRevision => contentRevision.detailId, {
    onDelete: "CASCADE"
  })
  revision?: ExerciseRevisionEntity;
}
