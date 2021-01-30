import { Request, Response, Router } from "express";
import { getManager } from "typeorm";
import { ExerciseEntity } from "../database/entities";

const renderShell = (
  req: Request,
  res: Response,
  properties?: {
    url: string;
    title: string;
    description: string;
  }
) =>
  res.render("index", {
    layout: false,
    origin: req.get("host"),
    og: {
      url: properties ? properties.url : "",
      title: properties ? properties.title : "express-openapi-app",
      description: properties ? properties.description : "Typing App",
    },
  });

export const shellRouter = Router();

shellRouter.get("/exercises/:id", async (req, res) => {
  const id = req.params.id;

  const exercise = await getManager().findOne(ExerciseEntity, id, {
    relations: ["latest"],
  });
  if (exercise === undefined || exercise.latest === undefined) {
    renderShell(req, res);

    return;
  }

  renderShell(req, res, {
    url: `/exercises/${id}`,
    title: exercise.latest.title,
    description: exercise.latest.description,
  });
});

shellRouter.get("*", (req, res) => {
  renderShell(req, res);
});
