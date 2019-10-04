import { Column, Entity, EntityManager, OneToOne, RelationId } from "typeorm";
import { ExerciseDraft, Playlist } from "../../../shared/api/entities";
import { BaseEntityClass } from "./BaseEntityClass";
import { ExerciseSummaryEntity } from "./ExerciseSummaryEntity";
import { PlaylistSummaryEntity } from "./PlaylistSummaryEntity";
import { TagSummaryEntity } from "./TagSummaryEntity";

@Entity("tags")
export class TagEntity extends BaseEntityClass {
  type: "Tag" = "Tag";

  @OneToOne(() => TagSummaryEntity, tagSummary => tagSummary.tag, {
    cascade: ["insert"]
  })
  summary?: TagSummaryEntity;
  @RelationId((tag: TagEntity) => tag.summary)
  summaryId!: string;

  @Column({
    unique: true
  })
  name!: string;

  @Column()
  description: string = "";

  @Column("datetime")
  checkedAt!: Date;

  constructor(name: string) {
    super();

    this.name = name;
  }
}

export const getTags = async (
  target: ExerciseSummaryEntity | PlaylistSummaryEntity,
  params: Partial<ExerciseDraft> | Partial<Playlist>,
  manager: EntityManager
) => {
  const prevTags = target.tags || [];
  const nextTags: TagEntity[] = [];

  const nextTagNames = normalizeTags(params.tags || []);

  const addedTags: TagEntity[] = [];
  await Promise.all(
    nextTagNames.map(async tagName => {
      if (!prevTags.some(prevTag => prevTag.name === tagName)) {
        let addedTag = await manager.findOne(TagEntity, {
          where: {
            name: tagName
          },
          relations: ["summary"]
        });

        if (addedTag === undefined) {
          const addedTagSummary = new TagSummaryEntity();
          addedTag = new TagEntity(tagName);
          addedTag.summary = addedTagSummary;
        }
        if (addedTag.summary === undefined) {
          throw Error("tag.summary is not defined");
        }

        if (target.type === "ExerciseSummary") {
          addedTag.summary.exerciseCount += 1;
        } else {
          addedTag.summary.playlistCount += 1;
        }

        addedTag.checkedAt = new Date();

        addedTags.push(addedTag);
        nextTags.push(addedTag);
      }
    })
  );

  const deletedTags: TagEntity[] = [];
  prevTags.forEach(prevTag => {
    if (!nextTagNames.includes(prevTag.name)) {
      const deletedTag = prevTag;
      if (deletedTag.summary === undefined) {
        throw Error("tag.summary is not defined");
      }

      if (target.type === "ExerciseSummary") {
        deletedTag.summary.exerciseCount -= 1;
      } else {
        deletedTag.summary.playlistCount -= 1;
      }

      deletedTag.checkedAt = new Date();

      deletedTags.push(deletedTag);
    } else {
      nextTags.push(prevTag);
    }
  });

  await manager.save([...addedTags, ...deletedTags]);

  return nextTags;
};

const normalizeTags = (tags: string[] = []) => {
  return [...new Set(tags)].filter(tag => tag.length > 0).slice(0, 5);
};
