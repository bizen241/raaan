import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseDetailEntity } from "./ExerciseDetailEntity";
import { ExerciseTagEntity } from "./ExerciseTagEntity";
import { UserEntity } from "./UserEntity";

@Entity("exercises")
export class ExerciseEntity extends BaseEntityClass {
  type: "Exercise" = "Exercise";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  author?: UserEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.author)
  authorId!: string;

  @OneToOne(() => ExerciseDetailEntity, exerciseDetail => exerciseDetail.exercise)
  detail?: ExerciseDetailEntity;
  @RelationId((exercise: ExerciseEntity) => exercise.detail)
  detailId!: string;

  @ManyToMany(() => ExerciseTagEntity)
  @JoinTable({
    name: "exercises_exercise_tags"
  })
  tags?: ExerciseTagEntity[];

  @Column()
  isPrivate: boolean = true;

  @Column()
  isLocked: boolean = false;

  constructor(author: UserEntity, detail: ExerciseDetailEntity) {
    super();

    this.author = author;
    this.detail = detail;
  }
}
