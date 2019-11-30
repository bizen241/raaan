import { createHash } from "crypto";
import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { UserAccount } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { createOperationDoc, errorBoundary, PathParams } from "../../../api/operation";
import { responseFindResult } from "../../../api/response";
import { UserAccountEntity } from "../../../database/entities";

export const PATCH: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { id: userAccountId }: PathParams = req.params;
  const params: Params<UserAccount> = req.body;

  await getManager().transaction(async manager => {
    const userAccount = await manager.findOne(UserAccountEntity, userAccountId, {
      relations: ["user", "user.summary"]
    });
    if (userAccount === undefined) {
      return next(createError(404));
    }
    if (userAccount.user === undefined || userAccount.user.summary === undefined) {
      return next(createError(500));
    }

    const isOwn = userAccount.userId === currentUser.id;
    if (!isOwn) {
      return next(createError(403));
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

    responseFindResult(req, res, userAccount);
  });
});

PATCH.apiDoc = createOperationDoc({
  entityType: "UserAccount",
  permission: "Read",
  hasId: true,
  hasBody: true
});
