import { Column } from "typeorm";
import { NavigationMode } from "../../../shared/api/entities";
import { Question } from "../../../shared/content";
import { BaseEntityClass } from "./BaseEntityClass";

export abstract class ExerciseDetailClass extends BaseEntityClass {
  @Column()
  lang: string = "en";

  @Column()
  title: string = "";

  @Column("json")
  tags: string[] = [];

  @Column()
  description: string = "";

  @Column()
  rubric: string = "";

  @Column("json")
  questions: Question[] = [];

  @Column()
  comment: string = "";

  @Column()
  navigationMode: NavigationMode = "random";
}
