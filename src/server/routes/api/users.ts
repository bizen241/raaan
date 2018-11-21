import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { User } from "../../../shared/api/entities";
import { createApiDoc } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search";
import { responseSearchResult } from "../../api/response";
import { UserEntity } from "../../database/entities";

export const GET: OperationFunction = async (req, res) => {
  const { page, name, permission } = parseSearchParams<User>("User", req.query);

  const users = await getManager().find(UserEntity, {
    where: {
      name,
      permission
    }
  });

  responseSearchResult(res, page, users);
};

GET.apiDoc = createApiDoc({
  summary: "Get a user",
  tag: "users",
  permission: "Guest"
});
