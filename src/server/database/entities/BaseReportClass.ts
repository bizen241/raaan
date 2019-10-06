import { Column, ManyToOne, RelationId } from "typeorm";
import { ReportReason, ReportState } from "../../../shared/api/entities/BaseReportObject";
import { BaseEntityClass } from "./BaseEntityClass";
import { UserEntity } from "./UserEntity";

export abstract class BaseReportClass<E extends BaseEntityClass> extends BaseEntityClass {
  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  reporter?: UserEntity;
  @RelationId((report: BaseReportClass<E>) => report.reporter)
  reporterId!: string;

  abstract target?: E;
  @RelationId((report: BaseReportClass<E>) => report.target)
  targetId!: string;

  @Column()
  reason!: ReportReason;

  @Column()
  comment: string = "";

  @Column()
  state: ReportState = "pending";

  constructor(reporter: UserEntity) {
    super();

    this.reporter = reporter;
  }
}
