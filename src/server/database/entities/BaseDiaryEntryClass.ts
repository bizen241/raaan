import { Column } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

export abstract class BaseDiaryEntryClass extends BaseEntityClass {
  @Column("date")
  date!: string;

  constructor(date: Date) {
    super();

    if (date !== undefined) {
      this.date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    }
  }
}
