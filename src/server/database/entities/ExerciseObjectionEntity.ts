import { Entity, OneToOne } from "typeorm";
import { BaseObjectionClass } from "./BaseObjectionClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise_objection")
export class ExerciseObjectionEntity extends BaseObjectionClass<ExerciseEntity> {
  type: "ExerciseObjection" = "ExerciseObjection";

  @OneToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  target?: ExerciseEntity;
}
