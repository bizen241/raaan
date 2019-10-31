import { OperationFunction } from "express-openapi";
import { getManager } from "typeorm";
import { Group } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { GroupEntity, GroupMemberEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { searchLimit, searchOffset } = parseQuery<Group>("Group", req.query);

  const query = await getManager()
    .createQueryBuilder(GroupEntity, "group")
    .leftJoinAndSelect("group.owner", "owner")
    .take(searchLimit)
    .skip(searchOffset);

  const [groups, count] = await query.getManyAndCount();

  responseSearchResult(req, res, groups, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Group",
  permission: "Guest",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, _, currentUser) => {
  const { name = "", description = "" }: Params<Group> = req.body;

  await getManager().transaction(async manager => {
    const group = new GroupEntity(currentUser, name);
    group.description = description;
    await manager.save(group);

    const groupOwner = new GroupMemberEntity(group, currentUser);
    groupOwner.permission = "owner";
    await manager.save(groupOwner);

    responseFindResult(req, res, group, groupOwner);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Group",
  permission: "Write",
  hasBody: true
});
