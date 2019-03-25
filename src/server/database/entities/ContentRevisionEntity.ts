import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseEntity } from "./ContentEntity";
import { ExerciseRevisionDetailEntity } from "./ContentRevisionDetailEntity";

@Entity()
export class ExerciseRevisionEntity extends BaseEntityClass {
  type: "ExerciseRevision" = "ExerciseRevision";

  @Column()
  contentId: string;

  @ManyToOne(() => ExerciseEntity, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "contentId"
  })
  content!: ExerciseEntity;

  @Column()
  detailId: string;

  @OneToOne(() => ExerciseRevisionDetailEntity, contentRevisionDetail => contentRevisionDetail.revision, {
    onDelete: "CASCADE"
  })
  @JoinColumn({
    name: "detailId"
  })
  detail!: ExerciseRevisionDetailEntity;

  constructor(content: ExerciseEntity, detail: ExerciseRevisionDetailEntity) {
    super();

    this.contentId = content.id;
    this.detailId = detail.id;
  }
}
