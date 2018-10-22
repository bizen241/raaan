import * as express from "express";
import { createApp } from "../app";

test("server", async () => {
  const app = express();

  const spyUse = jest.spyOn(app, "use");

  createApp(app);

  expect(spyUse).toBeCalledTimes(0);
});
