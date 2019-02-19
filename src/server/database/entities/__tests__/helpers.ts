import { getManager } from "typeorm";
import * as uuid from "uuid";
import { users } from "../../../session/__tests__/helpers";
import { createContentEntity } from "../ContentEntity";
import { createContentRevisionEntity } from "../ContentRevisionEntity";

export const insertContent = async (contentId?: string) => {
  const manager = getManager();

  await manager.save(users.Write);

  const content = createContentEntity({
    id: contentId || uuid(),
    author: users.Write
  });
  const revision = createContentRevisionEntity({
    id: uuid(),
    content,
    lang: "",
    title: "",
    tags: [],
    summary: "",
    comment: "",
    items: [],
    isLinear: false
  });

  await manager.save(content);
  await manager.save(revision);

  content.latest = revision;

  await manager.save(content);
};
