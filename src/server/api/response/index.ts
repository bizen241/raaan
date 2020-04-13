import { Request, Response } from "express";
import { SearchResponse } from "../../../shared/api/response/search";
import { Entity } from "../../database/entities";
import { normalizeEntities } from "./normalize";

export const responseFindResult = (req: Request, res: Response, ...entities: Entity[]) => {
  const store = normalizeEntities({ sessionId: req.sessionID }, entities);

  res.status(200).json(store);
};

export const responseSearchResult = (req: Request, res: Response, entities: Entity[], count: number) => {
  const searchResult: SearchResponse = {
    ids: entities.map((entity) => entity.id),
    entities: normalizeEntities({ sessionId: req.sessionID }, entities),
    count,
  };

  res.status(200).json(searchResult);
};
