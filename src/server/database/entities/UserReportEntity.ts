import { Entity, ManyToOne } from "typeorm";
import { UserEntity } from ".";
import { BaseReportClass } from "./BaseReportClass";

@Entity("user_reports")
export class UserReportEntity extends BaseReportClass<UserEntity> {
  type: "UserReport" = "UserReport";

  @ManyToOne(() => UserEntity, {
    onDelete: "SET NULL"
  })
  target?: UserEntity;
}
