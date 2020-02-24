import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { UserExerciseVoteList } from "../../lists/exercise-votes/UserExerciseVoteList";

export const UserUpVotesPage = createPage<"User">()(
  React.memo(({ t }) => t("高評価した問題集")),
  React.memo(({ entityId: userId }) => {
    return (
      <UserExerciseVoteList
        initialParams={{
          voterId: userId,
          isUp: true
        }}
      />
    );
  })
);
