import * as React from "react";
import { useContext } from "react";
import { GroupExercise } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { GroupContext, ToggleGroupExerciseList } from "../../list/exercise-summaries/ToggleGroupExerciseList";
import { UserContext } from "../../project/Context";
import { DialogContent } from "../../ui";

export const GroupExercisesDialog = createDialog<{
  groupId: string;
}>(
  React.memo(({ groupId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupExercises } = useSearch<GroupExercise>("GroupExercise", {
      groupId
    });

    return (
      <DialogContent title="クイズをグループに公開" onClose={onClose}>
        <GroupContext.Provider value={groupId}>
          <ToggleGroupExerciseList
            initialParams={{
              authorId: currentUser.id
            }}
            onReload={onReloadGroupExercises}
          />
        </GroupContext.Provider>
      </DialogContent>
    );
  })
);
