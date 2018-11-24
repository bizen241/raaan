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

export const skip = (page: number) => entityCountPerPage * (page - 1);
export const take = entityCountPerPage;

export const responseSearchResult = (res: Response, entities: EntityClass[], count: number) => {
  try {
    const searchResult: SearchResult = {
      ids: entities.map(entity => entity.id),
      entities: normalizeEntities(entities),
      count
    };

    res.status(200).json(searchResult);
  } catch (e) {
    throw createError(500);
  }
};
