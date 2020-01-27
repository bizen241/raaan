import { useContext } from "react";
import React from "react";
import { ExerciseSummaryList } from "../../lists/exercise-summaries/ExerciseSummaryList";
import { UserContext } from "../../project/Context";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Column } from "../../ui";

export const UserExerciseDraftsPage = React.memo<PageProps>(() => {
  const currentUser = useContext(UserContext);

  return (
    <Page title="保存された下書き">
      <Column pb={1}>
        <ExerciseSummaryList
          initialParams={{
            authorId: currentUser.id,
            isEditing: true
          }}
        />
      </Column>
    </Page>
  );
});
