import createError from "http-errors";
import { EntityManager } from "typeorm";
import { getScore } from "../../shared/exercise";
import {
  ContestEntity,
  ContestEntryEntity,
  GroupMemberEntity,
  SubmissionEntity,
  UserEntity
} from "../database/entities";

export const updateContestEntry = async (params: {
  manager: EntityManager;
  currentUser: UserEntity;
  submission: SubmissionEntity;
  contestId: string;
}) => {
  const { manager, currentUser, submission, contestId } = params;

  const contest = await manager.findOne(ContestEntity, params.contestId);
  if (contest === undefined) {
    throw createError(400);
  }

  const groupMember = await manager.findOne(GroupMemberEntity, {
    group: {
      id: contest.groupId
    },
    user: {
      id: currentUser.id
    }
  });
  if (groupMember === undefined) {
    throw createError(403);
  }

  const contestEntry = await manager.findOne(ContestEntryEntity, {
    where: {
      contest: {
        id: contestId
      },
      participant: {
        id: groupMember.id
      }
    },
    relations: ["participant", "participant.user"]
  });

  if (contestEntry === undefined) {
    const newContestEntry = new ContestEntryEntity(contest, groupMember, {
      accuracy: submission.accuracy,
      time: submission.time,
      typeCount: submission.typeCount
    });

    await manager.save(newContestEntry);

    return newContestEntry;
  } else {
    const prevScore = getScore({
      accuracy: contestEntry.accuracy,
      time: contestEntry.time,
      typeCount: contestEntry.typeCount
    });
    const nextScore = getScore({
      accuracy: submission.accuracy,
      time: submission.time,
      typeCount: submission.typeCount
    });

    if (nextScore > prevScore) {
      contestEntry.accuracy = submission.accuracy;
      contestEntry.time = submission.time;
      contestEntry.typeCount = submission.typeCount;

      await manager.save(contestEntry);
    }

    return contestEntry;
  }
};
