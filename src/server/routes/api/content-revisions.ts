import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ContentRevision, ContentDetail } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import {
  ContentEntity,
  ContentRevisionEntity,
  createContentEntity,
  createContentRevisionEntity,
  UserEntity,
  createContentDetailEntity
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
  const params: SaveParams<ContentDetail> = req.body;

  const manager = getManager();

  const content = await getContent(req.session.user, contentId);

  const newDetail = createContentDetailEntity(manager, params);
  const newRevisionId = await saveContentRevision(content, newRevision);

  const loadedContent = await getManager().findOne(ContentEntity, newRevisionId, {
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
