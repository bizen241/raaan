import { Response } from "express";
import { SearchResponse } from "../../../shared/api/response/search";
import { Entity } from "../../database/entities";
import { normalizeEntities } from "./normalize";

export const responseFindResult = (res: Response, ...entities: Entity[]) => {
  const store = normalizeEntities(entities, false);

  res.status(200).json(store);
};

export const responseSearchResult = (res: Response, entities: Entity[], count: number) => {
  const searchResult: SearchResponse = {
    ids: entities.map(entity => entity.id),
    entities: normalizeEntities(entities, true),
    count
  };

  res.status(200).json(searchResult);
};
