import { Add } from "@material-ui/icons";
import React from "react";
import { createPage } from "../../../enhancers/createPage";
import { useToggleState } from "../../../hooks/useToggleState";
import { GroupExercisesDialog } from "../../dialogs/groups/GroupExercisesDialog";
import { GroupExerciseList } from "../../lists/group-exercises/GroupExerciseList";
import { Button } from "../../ui";

export const GroupExercisesPage = createPage<"Group">()(
  React.memo(({ t }) => t("グループの問題集")),
  React.memo(({ entityId: groupId }) => {
    const [isGroupExercisesDialogOpen, toggleGroupExercisesDialog] = useToggleState();

    return (
      <>
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
      </>
    );
  })
);
