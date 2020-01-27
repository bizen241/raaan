import React from "react";
import { UserExerciseVoteList } from "../../lists/exercise-votes/UserExerciseVoteList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";

export const UserDownVotesPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="低評価した問題集">
      <UserExerciseVoteList
        initialParams={{
          voterId: userId,
          isUp: false
        }}
      />
    </Page>
  );
});
