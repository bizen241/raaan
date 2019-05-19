import { Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { ExerciseDetailClass } from "./ExerciseDetailClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise_details")
export class ExerciseDetailEntity extends ExerciseDetailClass {
  type: "ExerciseDetail" = "ExerciseDetail";

  @OneToOne(() => ExerciseEntity, exercise => exercise.detail, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn()
  exercise?: ExerciseEntity;
  @RelationId((exerciseDetail: ExerciseDetailEntity) => exerciseDetail.exercise)
  exerciseId!: string;
}
