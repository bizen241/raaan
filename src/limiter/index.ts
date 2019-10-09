import { Express } from "express";
import * as rateLimit from "express-rate-limit";
import { RateLimitStore } from "./store";

export const useLimiter = (app: Express) => {
  app.use("/api/", limiter);
};

const max = 15 * 60;
const windowMs = 15 * 60 * 1000;

const limiter = rateLimit({
  store: new RateLimitStore(max, windowMs),
  max
});
