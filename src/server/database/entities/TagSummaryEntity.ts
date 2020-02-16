import { Column, Entity, JoinColumn, OneToOne, RelationId } from "typeorm";
import { EntityId } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { TagEntity } from "./TagEntity";

@Entity("tag_summaries")
export class TagSummaryEntity extends BaseEntityClass<"TagSummary"> {
  readonly type = "TagSummary";

  @OneToOne(
    () => TagEntity,
    tag => tag.summary,
    {
      onDelete: "CASCADE"
    }
  )
  @JoinColumn()
  tag?: TagEntity;
  @RelationId((tagSummary: TagSummaryEntity) => tagSummary.tag)
  tagId!: EntityId<"Tag">;

  @Column()
  exerciseCount: number = 0;

  @Column()
  playlistCount: number = 0;

  @Column()
  followerCount: number = 0;

  @Column()
  submittedCount: number = 0;

  @Column()
  typedCount: number = 0;
}
