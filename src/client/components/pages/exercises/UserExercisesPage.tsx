import { Edit } from "@material-ui/icons";
import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ExerciseSummaryList } from "../../lists/exercise-summaries/ExerciseSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const UserExercisesPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const { currentUserId } = useCurrentUser();

  const isOwn = userId === currentUserId;

  return (
    <Page title={isOwn ? "自分の問題集" : "ユーザーの問題集"}>
      {isOwn && <Button icon={<Edit />} label="編集中の問題集" to="/exercises/edit" />}
      <ExerciseSummaryList
        initialParams={{
          authorId: userId
        }}
      />
    </Page>
  );
});
