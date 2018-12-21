import { getManager } from "typeorm";
import * as uuid from "uuid";
import { users } from "../../../session/__tests__/helpers";
import { createContent } from "../ContentEntity";
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
    version: 1,
    comment: "",
    data: {
      version: 1,
      title: "",
      lang: "ja",
      tags: [],
      parts: [],
      comment: "",
      shuffle: true
    }
  });

  await manager.save(content);
  await manager.save(revision);

  content.latest = revision;

  await manager.save(content);
};
