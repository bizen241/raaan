import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { BaseEntityClass } from "./BaseEntityClass";
import { TagEntity } from "./TagEntity";

@Entity("tag_summaries")
export class TagSummaryEntity extends BaseEntityClass {
  type: "TagSummary" = "TagSummary";

  @OneToOne(() => TagEntity, tag => tag.summary, {
    onDelete: "CASCADE"
  })
  @JoinColumn()
  tag?: TagEntity;
  @RelationId((tagSummary: TagSummaryEntity) => tagSummary.tag)
  tagId!: string;

  @Column()
  exerciseCount: number = 0;

  @Column()
  playlistCount: number = 0;

  @Column()
  followerCount: number = 0;
}
