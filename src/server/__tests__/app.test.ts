import * as express from "express";
import { createApp } from "../app";
import { testProcessEnv } from "./helpers";

test("app", async () => {
  const app = express();

  const spyUse = jest.spyOn(app, "use");

  createApp(testProcessEnv, app);

  expect(spyUse).toBeCalledTimes(8);
});
