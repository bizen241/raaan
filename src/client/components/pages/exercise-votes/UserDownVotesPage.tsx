import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { UserExerciseVoteList } from "../../lists/exercise-votes/UserExerciseVoteList";

export const UserDownVotesPage = createPage<"User">()(
  React.memo(({ t }) => t("低評価した問題集")),
  React.memo(({ entityId: userId }) => {
    return (
      <UserExerciseVoteList
        initialParams={{
          voterId: userId,
          isUp: false,
        }}
      />
    );
  })
);
