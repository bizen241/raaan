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
    <Page title={isOwn ? "自分のクイズ" : "ユーザーのクイズ"}>
      {isOwn && <Button icon={<Edit />} label="編集中のクイズ" to="/exercises/edit" />}
      <ExerciseSummaryList
        initialParams={{
          authorId: userId
        }}
      />
    </Page>
  );
});
