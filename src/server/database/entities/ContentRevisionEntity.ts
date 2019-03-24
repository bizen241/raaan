import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ContentEntity } from "./ContentEntity";
import { ContentRevisionDetailEntity } from "./ContentRevisionDetailEntity";

@Entity()
export class ContentRevisionEntity extends BaseEntityClass {
  type: "ContentRevision" = "ContentRevision";

  @Column()
  contentId: string;

  @ManyToOne(() => ContentEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "contentId"
  })
  content!: ContentEntity;

  @Column()
  detailId: string;

  @OneToOne(() => ContentRevisionDetailEntity, contentRevisionDetail => contentRevisionDetail.revision, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "detailId"
  })
  detail!: ContentRevisionDetailEntity;

  constructor(content: ContentEntity, detail: ContentRevisionDetailEntity) {
    super();

    this.contentId = content.id;
    this.detailId = detail.id;
  }
}
