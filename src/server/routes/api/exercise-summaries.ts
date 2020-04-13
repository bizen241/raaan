import { createSearchOperation } from "../../api/operation";
import { ExerciseSummaryEntity } from "../../database/entities";

export const GET = createSearchOperation("ExerciseSummary", "Guest", async ({ currentUser, manager, params }) => {
  const { authorId, tags, title, isEditing } = params;

  const query = manager
    .createQueryBuilder(ExerciseSummaryEntity, "exerciseSummary")
    .leftJoinAndSelect("exerciseSummary.exercise", "exercise")
    .leftJoinAndSelect("exerciseSummary.tags", "tags")
    .leftJoinAndSelect("exercise.author", "author")
    .leftJoinAndSelect("exercise.latest", "latest")
    .leftJoinAndSelect("exercise.draft", "draft");

  if (authorId !== undefined) {
    query.andWhere("author.id = :authorId", { authorId });
  }
  if (tags !== undefined) {
    query.innerJoinAndSelect("exerciseSummary.tags", "searchTags", "searchTags.name IN (:...tags)", {
      tags: tags.split(/\s/),
    });
  }
  if (title !== undefined) {
    query.andWhere("MATCH(exerciseSummary.title) AGAINST (:title)", { title });
  }

  const isAuthor = authorId !== undefined && authorId === currentUser.id;
  if (isAuthor) {
    if (isEditing !== undefined) {
      query.andWhere("draft.isMerged = :isMerged", { isMerged: !isEditing });
    }
  } else {
    query.andWhere("exercise.isPrivate = false");
  }

  return query;
});
