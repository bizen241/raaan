import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ExerciseEntity";
import { ExerciseRevisionDetailEntity } from "./ExerciseRevisionDetailEntity";

@Entity("exercise_revisions")
export class ExerciseRevisionEntity extends BaseEntityClass {
  type: "ExerciseRevision" = "ExerciseRevision";

  @Column()
  exerciseId: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "exerciseId"
  })
  exercise!: ExerciseEntity;

  @Column()
  detailId: string;

  @OneToOne(() => ExerciseRevisionDetailEntity, contentRevisionDetail => contentRevisionDetail.revision, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "detailId"
  })
  detail!: ExerciseRevisionDetailEntity;

  constructor(content: ExerciseEntity, detail: ExerciseRevisionDetailEntity) {
    super();

    this.exerciseId = content && content.id;
    this.detailId = detail && detail.id;
  }
}
