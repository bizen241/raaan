import { Entity, OneToOne } from "typeorm";
import { ContentDetailClass } from "./ContentDetailClass";
import { ContentRevisionEntity } from "./ContentRevisionEntity";

@Entity()
export class ContentRevisionDetailEntity extends ContentDetailClass {
  type: "ContentRevisionDetail" = "ContentRevisionDetail";

  @OneToOne(() => ContentRevisionEntity, contentRevision => contentRevision.detailId, {
    onDelete: "CASCADE"
  })
  revision?: ContentRevisionEntity;
}
