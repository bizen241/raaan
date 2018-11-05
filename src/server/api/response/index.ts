import { Response } from "express";
import * as createError from "http-errors";
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
