import { Edit } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { ExerciseSummaryList } from "../../list/exercise-summaries/ExerciseSummaryList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const UserExercisesPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

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
