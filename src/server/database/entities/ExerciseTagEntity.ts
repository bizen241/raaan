import { Column, Entity, Index, ManyToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";

@Entity("exercise-tags")
export class ExerciseTagEntity extends BaseEntityClass {
  type: "ExerciseTag" = "ExerciseTag";

  @ManyToOne(() => ExerciseSummaryEntity, exerciseSummary => exerciseSummary.tags, {
    onDelete: "CASCADE"
  })
  exerciseSummary?: ExerciseSummaryEntity;

  @Column()
  @Index()
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
