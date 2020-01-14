import { Column } from "typeorm";
import { Exercise, Question, Reference } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
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

  @Column("json")
  references!: Reference[];

  @Column()
  isRandom!: boolean;

  constructor(params: Params<Exercise> | undefined) {
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
