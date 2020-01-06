import { Response } from "express";
import { HttpError } from "http-errors";
import { createRequest, createResponse, MockResponse } from "node-mocks-http";
import { getManager } from "typeorm";
import { stringifyParams } from "../../../client/api/request/search";
import { EntityObject, Permission } from "../../../shared/api/entities";
import { Params } from "../../../shared/api/request/params";
import { SearchQuery } from "../../../shared/api/request/parse";
import { EntityStore } from "../../../shared/api/response/get";
import { insertUser } from "./entities";

export const createMocks = async (permission: Permission) => {
  const manager = getManager();
  const req = createRequest();
  const res = createResponse();

  const { account, config, user } = await insertUser(permission);

  req.user = user;
  req.session = {} as any;

  const next = (error: HttpError) => {
    res.status(error.statusCode);
  };

  return { req, res, next, manager, user, account, config };
};

export const getFindResult = (res: MockResponse<Response>) => res._getJSONData() as EntityStore;
export const getSearchResult = (res: MockResponse<Response>) =>
  res._getJSONData() as {
    ids: string[];
    entities: EntityStore;
    count: number;
  };

export const createQuery = <E extends EntityObject>(params: Params<E>) => {
  const queryString = stringifyParams(params);
  const urlSearchParams = new URLSearchParams(queryString);

  return [...urlSearchParams.entries()].reduce(
    (query, [key, value]) => ({
      ...query,
      [key]: value
    }),
    {} as SearchQuery<E>
  );
};

export const createParams = (id: string) => ({ id });
