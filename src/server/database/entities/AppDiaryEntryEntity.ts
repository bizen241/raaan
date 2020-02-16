import { Column, Entity } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("app_diaries")
export class AppDiaryEntryEntity extends BaseEntityClass<"AppDiaryEntry"> {
  readonly type = "AppDiaryEntry";

  @Column("date")
  date!: Date;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(date: Date) {
    super();

    this.date = date;
  }
}
