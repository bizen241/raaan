import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { ExerciseDetailObject } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";

@Entity("exercise-summaries")
export class ExerciseSummaryEntity extends BaseEntityClass {
  type: "ExerciseSummary" = "ExerciseSummary";

  @OneToOne(() => ExerciseEntity, exercise => exercise.summary, {
    cascade: true,
    onDelete: "CASCADE"
  })
  @JoinColumn()
  exercise?: ExerciseEntity;
  @RelationId((exerciseSummary: ExerciseSummaryEntity) => exerciseSummary.exercise)
  exercisetId!: string;

  @Column()
  lang: string = "en";

  @Column()
  title: string = "";

  @Column()
  description: string = "";

  constructor(params?: ExerciseDetailObject) {
    super();

    if (params !== undefined) {
      this.lang = params.lang;
      this.title = params.title;
      this.description = params.description;
    }
  }
}
