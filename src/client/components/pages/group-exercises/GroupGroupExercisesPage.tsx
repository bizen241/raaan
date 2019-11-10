import { Add } from "@material-ui/icons";
import * as React from "react";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupExercisesDialog } from "../../dialogs/groups/GroupExercisesDialog";
import { GroupExerciseList } from "../../list/group-exercises/GroupExerciseList";
import { PageProps } from "../../project/Router";
import { Button } from "../../ui";
import { Page } from "../../ui/Page";

export const GroupGroupExercisesPage = React.memo<PageProps>(({ match }) => {
  const groupId = match.params.id;

  const [isGroupExercisesDialogOpen, toggleGroupExercisesDialog] = useToggleState();

  return (
    <Page title="グループのクイズ">
      <Button icon={<Add />} label="クイズを追加" onClick={toggleGroupExercisesDialog} />
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
