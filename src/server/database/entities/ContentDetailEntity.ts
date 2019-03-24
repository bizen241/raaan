import { Entity, OneToOne } from "typeorm";
import { ContentDetailClass } from "./ContentDetailClass";
import { ContentEntity } from "./ContentEntity";

@Entity()
export class ContentDetailEntity extends ContentDetailClass {
  type: "ContentDetail" = "ContentDetail";

  @OneToOne(() => ContentEntity, content => content.detailId, {
    onDelete: "CASCADE"
  })
  content?: ContentEntity;
}
