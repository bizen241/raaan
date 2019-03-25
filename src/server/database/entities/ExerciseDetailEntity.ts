import { Entity, OneToOne } from "typeorm";
import { ExerciseDetailClass } from "./ExerciseDetailClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity()
export class ExerciseDetailEntity extends ExerciseDetailClass {
  type: "ExerciseDetail" = "ExerciseDetail";

  @OneToOne(() => ExerciseEntity, content => content.detailId, {
    onDelete: "CASCADE"
  })
  content?: ExerciseEntity;
}
