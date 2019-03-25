import { Entity, OneToOne } from "typeorm";
import { ExerciseDetailClass } from "./ContentDetailClass";
import { ExerciseEntity } from "./ContentEntity";

@Entity()
export class ExerciseDetailEntity extends ExerciseDetailClass {
  type: "ExerciseDetail" = "ExerciseDetail";

  @OneToOne(() => ExerciseEntity, content => content.detailId, {
    onDelete: "CASCADE"
  })
  content?: ExerciseEntity;
}
