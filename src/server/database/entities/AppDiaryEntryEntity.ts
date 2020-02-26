import { Column, Entity } from "typeorm";
import { DateString } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("app_diaries")
export class AppDiaryEntryEntity extends BaseEntityClass<"AppDiaryEntry"> {
  readonly type = "AppDiaryEntry";

  @Column("date")
  date: DateString;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(date: DateString) {
    super();

    this.date = date;
  }
}
