import { Entity, OneToOne } from "typeorm";
import { ExerciseDetailClass } from "./ExerciseDetailClass";
import { ExerciseRevisionEntity } from "./ExerciseRevisionEntity";

@Entity()
export class ExerciseRevisionDetailEntity extends ExerciseDetailClass {
  type: "ExerciseRevisionDetail" = "ExerciseRevisionDetail";

  @OneToOne(() => ExerciseRevisionEntity, contentRevision => contentRevision.detailId, {
    onDelete: "CASCADE"
  })
  revision?: ExerciseRevisionEntity;
}
