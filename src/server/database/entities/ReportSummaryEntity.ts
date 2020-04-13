import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ReportEntity } from "./ReportEntity";

@Entity("report_summaries")
export class ReportSummaryEntity extends BaseEntityClass<"ReportSummary"> {
  readonly type = "ReportSummary";

  @OneToOne(() => ReportEntity, (report) => report.summary, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  parent?: ReportEntity;
  @RelationId((reportSummary: ReportSummaryEntity) => reportSummary.parent)
  parentId!: EntityId<"Report">;

  @Column()
  commentCount: number = 0;
}
