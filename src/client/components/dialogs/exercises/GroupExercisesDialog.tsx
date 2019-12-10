import * as React from "react";
import { useContext } from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { ExerciseContext, ToggleGroupExerciseList } from "../../list/groups/ToggleGroupExerciseList";
import { UserContext } from "../../project/Context";
import { DialogContent } from "../../ui";

export const GroupExercisesDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupExercises } = useSearch("GroupExercise", {
      exerciseId
    });

    return (
      <DialogContent title="問題集をグループに公開" onClose={onClose}>
        <ExerciseContext.Provider value={exerciseId}>
          <ToggleGroupExerciseList
            initialParams={{
              userId: currentUser.id
            }}
            onReload={onReloadGroupExercises}
          />
        </ExerciseContext.Provider>
      </DialogContent>
    );
  })
);
