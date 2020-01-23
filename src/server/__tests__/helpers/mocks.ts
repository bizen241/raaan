import { Request, Response } from "express";
import { HttpError } from "http-errors";
import { createRequest, createResponse, MockRequest, MockResponse } from "node-mocks-http";
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

  const { account, config, user } = await insertUser({
    userPermission: permission
  });

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

export const setGetParams = (req: MockRequest<Request>, id: string) => {
  req.params = { id };
};

export const setSearchParams = <E extends EntityObject>(req: MockRequest<Request>, params: Params<E>) => {
  const queryString = stringifyParams(params);
  const urlSearchParams = new URLSearchParams(queryString);

  req.query = [...urlSearchParams.entries()].reduce(
    (query, [key, value]) => ({
      ...query,
      [key]: value
    }),
    {} as SearchQuery<E>
  );
};

export const setPostParams = <E extends EntityObject>(req: MockRequest<Request>, params: Params<E>) => {
  req.body = params;
};

export const setPatchParams = <E extends EntityObject>(req: MockRequest<Request>, id: string, params: Params<E>) => {
  req.params = { id };
  req.body = params;
};

export const setDeleteParams = (req: MockRequest<Request>, id: string) => {
  req.params = { id };
};
