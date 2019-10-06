import { Entity, ManyToOne } from "typeorm";
import { UserEntity } from ".";
import { BaseReportClass } from "./BaseReportClass";

@Entity("user-reports")
export class UserReportEntity extends BaseReportClass<UserEntity> {
  type: "UserReport" = "UserReport";

  @ManyToOne(() => UserEntity, {
    onDelete: "SET NULL"
  })
  target?: UserEntity;

  constructor(reporter: UserEntity, target: UserEntity) {
    super(reporter);

    this.target = target;
  }
}
