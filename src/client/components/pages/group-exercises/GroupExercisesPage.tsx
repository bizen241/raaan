import { Add } from "@material-ui/icons";
import * as React from "react";
import { GroupExerciseList } from "../../list/group-exercises/GroupExerciseList";
import { PageProps } from "../../project/Router";
import { Button, Column } from "../../ui";
import { Page } from "../../ui/Page";

export const GroupExercisesPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  return (
    <Page title="グループのクイズ">
      <Button icon={<Add />} label="クイズを追加" />
      <Column pb={1}>
        <GroupExerciseList
          initialParams={{
            groupId
          }}
        />
      </Column>
    </Page>
  );
});
