import { Entity, ManyToOne } from "typeorm";
import { BaseCommentClass } from "./BaseCommentClass";
import { ReportEntity } from "./ReportEntity";
import { UserEntity } from "./UserEntity";

@Entity("report_comments")
export class ReportCommentEntity extends BaseCommentClass<ReportEntity> {
  type: "ReportComment" = "ReportComment";

  @ManyToOne(() => ReportEntity, {
    onDelete: "CASCADE"
  })
  target?: ReportEntity;

  constructor(target: ReportEntity, author: UserEntity, body: string) {
    super(author, body);

    this.target = target;
  }
}
