import { getManager } from "typeorm";
import * as uuid from "uuid";
import { users } from "../../../session/__tests__/helpers";
import { createContentDetailEntity } from "../ContentDetailEntity";
import { createContentEntity } from "../ContentEntity";

export const insertContent = async (contentId?: string) => {
  const manager = getManager();

  await manager.save(users.Write);

  const detail = await createContentDetailEntity(manager, {
    id: uuid(),
    lang: "",
    title: "",
    tags: [],
    description: "",
    rubric: "",
    items: [],
    comment: "",
    navigationMode: "random"
  });

  await createContentEntity(manager, {
    id: contentId || uuid(),
    author: users.Write,
    detail
  });
};
