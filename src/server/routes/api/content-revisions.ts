import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { ContentRevision } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { responseFindResult } from "../../api/response";
import { ContentEntity, createContentEntity, createContentRevisionEntity, UserEntity } from "../../database/entities";

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

export const POST: OperationFunction = errorBoundary(async (req, res) => {
  const params: SaveParams<ContentRevision> = req.body;

  const content = await getContent(req.session.user, params.contentId);

  const newRevision = createContentRevisionEntity({
    content,
    lang: params.lang || "",
    tags: params.tags || [],
    title: params.title || "",
    summary: params.summary || "",
    comment: params.comment || "",
    items: params.items || [],
    isLinear: params.isLinear || false
  });

  await getManager().transaction(async manager => {
    const savedRevision = await manager.save(newRevision);

    content.latest = savedRevision;
    const savedContent = await manager.save(content);

    responseFindResult(res, savedContent);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "ContentRevision",
  summary: "Create a revision of content",
  permission: "Write",
  hasBody: true
});
