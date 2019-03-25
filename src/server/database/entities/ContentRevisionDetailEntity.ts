import { Entity, OneToOne } from "typeorm";
import { ExerciseDetailClass } from "./ContentDetailClass";
import { ExerciseRevisionEntity } from "./ContentRevisionEntity";

@Entity()
export class ExerciseRevisionDetailEntity extends ExerciseDetailClass {
  type: "ExerciseRevisionDetail" = "ExerciseRevisionDetail";

  @OneToOne(() => ExerciseRevisionEntity, contentRevision => contentRevision.detailId, {
    onDelete: "CASCADE"
  })
  revision?: ExerciseRevisionEntity;
}
