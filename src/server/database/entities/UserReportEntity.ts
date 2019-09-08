import { Entity, ManyToOne, RelationId } from "typeorm";
import { UserEntity } from ".";
import { BaseEntityClass } from "./BaseEntityClass";

@Entity("user-reports")
export class UserReportEntity extends BaseEntityClass {
  type: "UserReport" = "UserReport";

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  target?: UserEntity;
  @RelationId((userReport: UserReportEntity) => userReport.target)
  targetId!: string;

  @ManyToOne(() => UserEntity, {
    onDelete: "CASCADE"
  })
  reporter?: UserEntity;
  @RelationId((userReport: UserReportEntity) => userReport.reporter)
  reporterId!: string;

  constructor(reporter: UserEntity, target: UserEntity) {
    super();

    this.target = target;
    this.reporter = reporter;
  }
}
