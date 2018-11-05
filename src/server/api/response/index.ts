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

    const isFirstPage = page === 1;
    const isEmpty = entityIds.length === 0;

    const startIndex = isFirstPage ? 0 : 1;
    const endIndex = startIndex + entityCountPerPage;

    const hasPrev = !isFirstPage && !isEmpty;
    const hasNext = entityIds.length - 1 === endIndex + 1;

    const searchResult: SearchResult = {
      ids: entityIds.slice(startIndex, endIndex),
      prev: hasPrev ? null : entityIds[0],
      next: hasNext ? null : entityIds[endIndex + 1],
      entities: normalizeEntities(entities)
    };

    res.status(200).json(searchResult);
  } catch (e) {
    throw createError(500);
  }
};
