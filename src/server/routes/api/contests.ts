import { OperationFunction } from "express-openapi";
import * as createError from "http-errors";
import { getManager } from "typeorm";
import { Contest } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { createOperationDoc, errorBoundary } from "../../api/operation";
import { parseQuery } from "../../api/request/search/parse";
import { responseFindResult, responseSearchResult } from "../../api/response";
import { ContestEntity, ExerciseEntity, GroupMemberEntity } from "../../database/entities";

export const GET: OperationFunction = errorBoundary(async (req, res) => {
  const { groupId, searchLimit, searchOffset } = parseQuery<Contest>("Contest", req.query);

  const manager = getManager();

  const query = manager
    .createQueryBuilder(ContestEntity, "contest")
    .leftJoinAndSelect("contest.group", "group")
    .leftJoinAndSelect("contest.exercise", "exercise")
    .take(searchLimit)
    .skip(searchOffset);

  if (groupId !== undefined) {
    query.andWhere("contest.groupId = :groupId", { groupId });
  }

  const [contests, count] = await query.getManyAndCount();

  responseSearchResult(req, res, contests, count);
});

GET.apiDoc = createOperationDoc({
  entityType: "Contest",
  permission: "Read",
  hasQuery: true
});

export const POST: OperationFunction = errorBoundary(async (req, res, next, currentUser) => {
  const { groupId, exerciseId, ...params }: Params<Contest> = req.body;

  await getManager().transaction(async manager => {
    const groupMember = await manager.findOne(GroupMemberEntity, {
      where: {
        group: {
          id: groupId
        },
        user: {
          id: currentUser.id
        }
      },
      relations: ["group"]
    });
    if (groupMember === undefined || groupMember.permission === "read") {
      return next(createError(403));
    }
    if (groupMember.group === undefined) {
      return next(createError(500));
    }

    const exercise = await manager.findOne(ExerciseEntity, exerciseId);
    if (exercise === undefined) {
      return next(createError(404));
    }

    if (params.startAt === undefined || params.finishAt === undefined) {
      return next(createError(400));
    }

    const startAt = new Date(params.startAt);
    const finishAt = new Date(params.finishAt);

    const contest = new ContestEntity(groupMember.group, exercise, "", startAt, finishAt);

    responseFindResult(req, res, contest);
  });
});

POST.apiDoc = createOperationDoc({
  entityType: "Contest",
  permission: "Write",
  hasBody: true
});
