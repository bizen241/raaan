import { Response } from "express";
import * as createError from "http-errors";
import { entityCountPerPage, SearchResult } from "../../../shared/api/response/search";
import { EntityClass } from "../../database/entities";
import { normalizeEntities } from "./normalize";

export const responseFindResult = (res: Response, ...entities: EntityClass[]) => {
  try {
    const store = normalizeEntities(entities);

    res.status(200).json(store);
  } catch (e) {
    throw createError(500);
  }
};

export const responseSearchResult = (res: Response, page: number, entities: EntityClass[]) => {
  try {
    const entityIds = entities.map(entity => entity.id);

    const startIndex = page === 1 ? 0 : 1;
    const endIndex = startIndex + entityCountPerPage;

    const searchResult: SearchResult = {
      ids: entityIds.slice(startIndex, endIndex + 1),
      hasNextPage: entityIds.length - 1 === endIndex + 1,
      entities: normalizeEntities(entities)
    };

    res.status(200).json(searchResult);
  } catch (e) {
    throw createError(500);
  }
};
