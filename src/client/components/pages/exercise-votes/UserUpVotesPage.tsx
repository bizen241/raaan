import * as React from "react";
import { UserExerciseVoteList } from "../../list/exercise-votes/UserExerciseVoteList";
import { PageProps } from "../../project/Router";
import { Page } from "../../ui/Page";

export const UserUpVotesPage = React.memo<PageProps>(props => {
  const userId = props.match.params.id;

  return (
    <Page title="高評価した問題集">
      <UserExerciseVoteList
        initialParams={{
          voterId: userId,
          isUp: true
        }}
      />
    </Page>
  );
});
