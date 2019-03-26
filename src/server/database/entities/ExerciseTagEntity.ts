import { Column, Entity } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("exercise_tags")
export class ExerciseTagEntity extends BaseEntityClass {
  type: "ExerciseTag" = "ExerciseTag";

  @Column()
  name: string;

  constructor(name: string) {
    super();

    this.name = name;
  }
}
