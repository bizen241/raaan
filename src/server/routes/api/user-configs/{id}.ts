import createError from "http-errors";
import { createPatchOperation } from "../../../api/operation";
import { UserConfigEntity } from "../../../database/entities";

export const PATCH = createPatchOperation("UserConfig", "Read", async ({ currentUser, manager, id, params }) => {
  const userConfig = await manager.findOne(UserConfigEntity, id);
  if (userConfig === undefined) {
    throw createError(404);
  }

  const isOwn = userConfig.userId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  if (params.settings !== undefined) {
    userConfig.settings = params.settings;
  }

  await manager.save(userConfig);

  return [userConfig];
});
