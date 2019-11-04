import { Edit } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { ExerciseObjectionList } from "../../list/exercise-objections/ExerciseObjectionList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const UserExerciseObjectionsPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "クイズの異議" : "ユーザーの異議"}>
      {isOwn && <Button icon={<Edit />} label="編集中の異議" to="/exercise-reports/edit" />}
      <ExerciseObjectionList
        initialParams={{
          objectorId: userId
        }}
      />
    </Page>
  );
});
