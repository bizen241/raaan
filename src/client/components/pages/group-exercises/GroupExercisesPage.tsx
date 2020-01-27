import { Add } from "@material-ui/icons";
import React from "react";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupExercisesDialog } from "../../dialogs/groups/GroupExercisesDialog";
import { GroupExerciseList } from "../../lists/group-exercises/GroupExerciseList";
import { Page } from "../../project/Page";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";

export const GroupExercisesPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  const [isGroupExercisesDialogOpen, toggleGroupExercisesDialog] = useToggleState();

  return (
    <Page title="グループの問題集">
      <Button icon={<Add />} label="問題集を追加" onClick={toggleGroupExercisesDialog} />
      <GroupExerciseList
        initialParams={{
          groupId
        }}
      />
      <GroupExercisesDialog
        groupId={groupId}
        isOpen={isGroupExercisesDialogOpen}
        onClose={toggleGroupExercisesDialog}
      />
    </Page>
  );
});
