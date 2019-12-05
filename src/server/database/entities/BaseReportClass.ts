import { Column, ManyToOne, RelationId } from "typeorm";
import { ReportReason, ReportState } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

export abstract class BaseReportClass<E extends BaseEntityClass> extends BaseEntityClass {
  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  reporter?: UserEntity;
  @RelationId((report: BaseReportClass<E>) => report.reporter)
  reporterId!: string;

  target?: E;
  @RelationId((report: BaseReportClass<E>) => report.target)
  targetId!: string;

  @Column()
  reason!: ReportReason;

  @Column()
  description: string = "";

  @Column()
  state: ReportState = "pending";

  @Column()
  comment: string = "";

  constructor(reporter: UserEntity, target: E, reason: ReportReason, description: string) {
    super();

    this.reporter = reporter;
    this.target = target;
    this.reason = reason;
    this.description = description;
  }
}
