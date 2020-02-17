import React from "react";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { ExerciseSummaryList } from "../../lists/exercise-summaries/ExerciseSummaryList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Column } from "../../ui";

export const UserExerciseDraftsPage = React.memo<PageProps>(() => {
  const { currentUserId } = useCurrentUser();

  return (
    <Page title="保存された下書き">
      <Column pb={1}>
        <ExerciseSummaryList
          initialParams={{
            authorId: currentUserId,
            isEditing: true
          }}
        />
      </Column>
    </Page>
  );
});
