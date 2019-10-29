import { Entity, ManyToOne } from "typeorm";
import { BaseReportClass } from "./BaseReportClass";
import { SynonymEntity } from "./SynonymEntity";
import { UserEntity } from "./UserEntity";

@Entity("synonym_reports")
export class SynonymReportEntity extends BaseReportClass<SynonymEntity> {
  type: "SynonymReport" = "SynonymReport";

  @ManyToOne(() => SynonymEntity, {
    onDelete: "SET NULL"
  })
  target?: SynonymEntity;

  constructor(reporter: UserEntity, target: SynonymEntity) {
    super(reporter);

    this.target = target;
  }
}
