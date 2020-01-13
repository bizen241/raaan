import { createHash } from "crypto";
import createError from "http-errors";
import { createPatchOperation } from "../../../api/operation";
import { UserAccountEntity } from "../../../database/entities";

export const PATCH = createPatchOperation("UserAccount", "Read", async ({ currentUser, manager, id, params }) => {
  const userAccount = await manager.findOne(UserAccountEntity, id, {
    relations: ["user", "user.summary"]
  });
  if (userAccount === undefined) {
    throw createError(404);
  }
  if (userAccount.user === undefined || userAccount.user.summary === undefined) {
    throw createError(500);
  }

  const isOwn = userAccount.userId === currentUser.id;
  if (!isOwn) {
    throw createError(403);
  }

  if (params.avatar !== undefined && params.avatar !== userAccount.avatar) {
    userAccount.avatar = params.avatar;

    const userSummary = userAccount.user.summary;

    if (params.avatar === "gravatar") {
      const md5 = createHash("md5");

      const emailHash = md5.update(userAccount.email).digest("hex");

      userSummary.emailHash = emailHash;
    } else {
      userSummary.emailHash = "";
    }

    await manager.save(userSummary);
  }

  await manager.save(userAccount);

  return [userAccount];
});
