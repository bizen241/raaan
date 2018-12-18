import { getManager } from "typeorm";
import * as uuid from "uuid";
import { users } from "../../../session/__tests__/helpers";
import { createContent } from "../ContentEntity";
import { createContentRevision } from "../ContentRevisionEntity";

export const insertContent = async (contentId?: string) => {
  const manager = getManager();

  await manager.save(users.Read);

  const content = createContent({
    id: contentId || uuid(),
    owner: users.Write
  });
  const revision = createContentRevision({
    id: uuid(),
    author: users.Write,
    content,
    version: 1,
    comment: "",
    data: {
      title: "",
      description: "",
      sentences: []
    },
    isProposed: true,
    isMerged: false
  });

  await manager.save(content);
  await manager.save(revision);

  content.latest = revision;

  await manager.save(content);
};
