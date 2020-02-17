import React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { ExerciseContext, ToggleGroupExerciseList } from "../../lists/groups/ToggleGroupExerciseList";

export const GroupExercisesDialog = createDialog<{
  exerciseId: string;
}>()(
  React.memo(({ t }) => t("問題集をグループに公開")),
  React.memo(({ exerciseId }) => {
    const { currentUserId } = useCurrentUser();

    const { onReload: onReloadGroupExercises } = useSearch("GroupExercise", {
      exerciseId
    });

    return (
      <>
        <ExerciseContext.Provider value={exerciseId}>
          <ToggleGroupExerciseList
            initialParams={{
              userId: currentUserId
            }}
            onReload={onReloadGroupExercises}
          />
        </ExerciseContext.Provider>
      </>
    );
  })
);
