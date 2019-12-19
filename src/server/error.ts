import * as express from "express";
import { HttpError } from "http-errors";

export const errorHandler: express.ErrorRequestHandler = (error: HttpError, _, res, __) => {
  res.status(error.status || 500);
  res.json({
    status,
    message: error.message
  });
};
