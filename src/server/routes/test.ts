import { Router } from "express";
import createError from "http-errors";
import {
  insertAppDiaryEntry,
  insertContest,
  insertExercise,
  insertGroup,
  insertGroupMember
} from "../__tests__/helpers";

export const testRouter = Router();

testRouter.get("/", async (req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return next(createError(403));
  }

  const currentUser = req.user;

  await insertAppDiaryEntry();
  const { exercise } = await insertExercise({
    exerciseAuthor: currentUser
  });
  const { group } = await insertGroup({
    groupOwner: currentUser
  });
  await insertGroupMember({
    groupMemberGroup: group,
    groupMemberUser: currentUser,
    groupMemberPermission: "owner"
  });
  await insertContest({
    contestGroup: group,
    contestExercise: exercise
  });

  res.status(200).send();
});
