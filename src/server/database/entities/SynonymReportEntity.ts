import { Entity, ManyToOne } from "typeorm";
import { BaseReportClass } from "./BaseReportClass";
import { SynonymEntity } from "./SynonymEntity";

@Entity("synonym_reports")
export class SynonymReportEntity extends BaseReportClass<SynonymEntity> {
  type: "SynonymReport" = "SynonymReport";

  @ManyToOne(() => SynonymEntity, {
    onDelete: "SET NULL"
  })
  target?: SynonymEntity;
}
