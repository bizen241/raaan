import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ReportEntity } from "./ReportEntity";
import { UserEntity } from "./UserEntity";

@Entity("report_comments")
export class ReportCommentEntity extends BaseEntityClass<"ReportComment"> {
  readonly type = "ReportComment";

  @ManyToOne(() => ReportEntity, {
    onDelete: "CASCADE",
  })
  target?: ReportEntity;
  @RelationId((reportComment: ReportCommentEntity) => reportComment.target)
  targetId!: EntityId<"Report">;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE",
  })
  author?: UserEntity;
  @RelationId((reportComment: ReportCommentEntity) => reportComment.author)
  authorId!: EntityId<"User">;

  @Column()
  body: string;

  constructor(target: ReportEntity, author: UserEntity, body: string) {
    super();

    this.target = target;
    this.author = author;
    this.body = body;
  }
}
