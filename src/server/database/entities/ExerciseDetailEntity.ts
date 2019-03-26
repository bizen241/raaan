import { Entity, OneToOne } from "typeorm";
import { ExerciseDetailClass } from "./ExerciseDetailClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise_details")
export class ExerciseDetailEntity extends ExerciseDetailClass {
  type: "ExerciseDetail" = "ExerciseDetail";

  @OneToOne(() => ExerciseEntity, content => content.detailId, {
    onDelete: "CASCADE"
  })
  content?: ExerciseEntity;
}
