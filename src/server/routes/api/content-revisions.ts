import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ContentRevision } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ContentEntity,
  ContentRevisionEntity,
  createContentEntity,
  createContentRevisionEntity,
  UserEntity
} from "../../database/entities";

const getContent = async (currentUser: UserEntity, contentId: string | undefined) => {
  if (contentId !== undefined) {
    const loadedContent = await getManager().findOne(ContentEntity, contentId, {
      relations: ["author", "latest", "tags"]
    });

    if (loadedContent !== undefined) {
      return loadedContent;
    }
  }

  return createContentEntity({
    author: currentUser
  });
};

const saveContentRevision = async (content: ContentEntity, revision: ContentRevisionEntity) =>
  getManager().transaction(async manager => {
    const savedRevision = await manager.save(revision);

    content.latest = savedRevision;
    const savedContent = await manager.save(content);

    savedRevision.content = savedContent;
    await manager.save(savedRevision);

    return savedRevision.id;
  });

export const POST: OperationFunction = errorBoundary(async (req, res) => {
  const { contentId, lang, title, tags, summary, comment, items, isLinear }: SaveParams<ContentRevision> = req.body;

  const content = await getContent(req.session.user, contentId);

  const newRevision = createContentRevisionEntity({ lang, tags, title, summary, comment, items, isLinear });
  const newRevisionId = await saveContentRevision(content, newRevision);

  const loadedRevision = await getManager().findOne(ContentRevisionEntity, newRevisionId, {
    relations: ["content", "content.author", "content.latest", "content.tags"]
  });
  if (loadedRevision === undefined) {
    throw new Error();
  }

  responseFindResult(res, loadedRevision);
});

POST.apiDoc = createOperationDoc({
  entityType: "ContentRevision",
  summary: "Create a revision of content",
  permission: "Write",
  hasBody: true
});
