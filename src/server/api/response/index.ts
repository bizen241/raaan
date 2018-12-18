import { Response } from "express";
import { entityCountPerPage, SearchResponse } from "../../../shared/api/response/search";
import { Entity } from "../../database/entities";
import { normalizeEntities } from "./normalize";

export const responseFindResult = (res: Response, ...entities: Entity[]) => {
  const store = normalizeEntities(entities);

  res.status(200).json(store);
};

export const skip = (page: number) => entityCountPerPage * (page - 1);
export const take = entityCountPerPage;

export const responseSearchResult = (res: Response, entities: Entity[], count: number) => {
  const searchResult: SearchResponse = {
    ids: entities.map(entity => entity.id),
    entities: normalizeEntities(entities),
    count
  };

  res.status(200).json(searchResult);
};
