import { Column, Entity } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("app_diaries")
export class AppDiaryEntryEntity extends BaseEntityClass {
  type: "AppDiaryEntry" = "AppDiaryEntry";

  @Column("date")
  date: string;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;

  constructor(date: string) {
    super();

    this.date = date;
  }
}
