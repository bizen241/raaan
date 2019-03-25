import { Column } from "typeorm";
import { ExerciseDetailObject, NavigationMode } from "../../../shared/api/entities";
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

  constructor(params?: ExerciseDetailObject) {
    super();

    if (params !== undefined) {
      this.lang = params.lang;
      this.title = params.title;
      this.tags = params.tags;
      this.description = params.description;
      this.rubric = params.rubric;
      this.questions = params.questions;
      this.comment = params.comment;
      this.navigationMode = params.navigationMode;
    }
  }
}
