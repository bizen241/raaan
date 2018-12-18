import { getManager } from "typeorm";
import * as uuid from "uuid";
import { users } from "../../../session/__tests__/helpers";
import { createContent } from "../ContentEntity";
import { createContentRevision } from "../ContentRevisionEntity";

export const insertContent = async (contentId?: string) => {
  const manager = getManager();

  await manager.save(users.Read);

  const content = createContent({
    id: contentId || uuid()
  });
  const revision = createContentRevision({
    id: uuid(),
    content,
    author: users.Read,
    version: 1,
    comment: "",
    object: {},
    isDraft: true
  });

  await manager.save(content);
  await manager.save(revision);

  content.latest = revision;

  await manager.save(content);
};
