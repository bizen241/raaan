import { Column } from "typeorm";
import { Exercise, Question } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { BaseEntityClass } from "./BaseEntityClass";

export abstract class BaseExerciseClass extends BaseEntityClass {
  @Column()
  lang!: string;

  @Column()
  title!: string;

  @Column("json")
  tags!: string[];

  @Column()
  description!: string;

  @Column("json")
  questions!: Question[];

  @Column()
  isRandom!: boolean;

  constructor(params?: SaveParams<Exercise>) {
    super();

    if (params !== undefined) {
      this.lang = params.lang || "en";
      this.title = params.title || "";
      this.tags = params.tags || [];
      this.description = params.description || "";
      this.questions = params.questions || [];
      this.isRandom = params.isRandom || true;
    }
  }
}
