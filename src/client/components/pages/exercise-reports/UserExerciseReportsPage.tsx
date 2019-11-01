import { Edit } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { ExerciseReportList } from "../../list/exercise-reports/ExerciseReportList";
import { UserContext } from "../../project/Context";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const UserExerciseReportssPage = React.memo<PageProps>(({ match }) => {
  const userId = match.params.id;

  const currentUser = useContext(UserContext);

  const isOwn = userId === currentUser.id;

  return (
    <Page title={isOwn ? "クイズの報告" : "ユーザーの報告"}>
      {isOwn && <Button icon={<Edit />} label="編集中の報告" to="/exercise-reports/edit" />}
      <ExerciseReportList
        initialParams={{
          reporterId: userId
        }}
      />
    </Page>
  );
});
