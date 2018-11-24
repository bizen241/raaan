import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { User } from "../../../shared/api/entities";
import { createApiDoc } from "../../api/operation";
import { parseSearchParams } from "../../api/request/search";
import { responseSearchResult, skip, take } from "../../api/response";
import { UserEntity } from "../../database/entities";

export const GET: OperationFunction = async (req, res) => {
  const { page, name, permission } = parseSearchParams<User>("User", req.query);

  const [users, count] = await getManager().findAndCount(UserEntity, {
    where: {
      name,
      permission
    },
    skip: skip(page),
    take
  });

  responseSearchResult(res, users, count);
};

GET.apiDoc = createApiDoc({
  summary: "Get users",
  tag: "users",
  permission: "Guest"
});
