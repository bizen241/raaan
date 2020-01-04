import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ReportEntity } from "./ReportEntity";

@Entity("report_summaries")
export class ReportSummaryEntity extends BaseEntityClass {
  type: "ReportSummary" = "ReportSummary";

  @OneToOne(
    () => ReportEntity,
    report => report.summary,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  parent?: ReportEntity;
  @RelationId((reportSummary: ReportSummaryEntity) => reportSummary.parent)
  parentId!: string;

  @Column()
  commentCount: number = 0;
}
