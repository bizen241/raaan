import { Column, Entity } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("app_summaries")
export class AppSummaryEntity extends BaseEntityClass<"AppSummary"> {
  readonly type = "AppSummary";

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;
}
