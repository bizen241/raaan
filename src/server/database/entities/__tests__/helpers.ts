import { getManager } from "typeorm";
import * as uuid from "uuid";
import { users } from "../../../session/__tests__/helpers";
import { createContent } from "../ContentEntity";
import { createContentObject } from "../ContentObjectEntity";
import { createContentRevision } from "../ContentRevisionEntity";

export const insertContent = async (contentId?: string) => {
  const manager = getManager();

  await manager.save(users.Write);

  const content = createContent({
    id: contentId || uuid(),
    owner: users.Write
  });
  const revision = createContentRevision({
    id: uuid(),
    author: users.Write,
    content,
    object: createContentObject({
      id: uuid(),
      lang: "",
      title: "",
      tags: [],
      summary: "",
      comment: "",
      items: [],
      isLinear: false
    }),
    version: 1,
    title: "",
    comment: ""
  });

  await manager.save(content);
  await manager.save(revision);

  content.latest = revision;

  await manager.save(content);
};
