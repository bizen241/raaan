import React, { useContext } from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useSearch } from "../../../hooks/useSearch";
import { ExerciseContext, ToggleGroupExerciseList } from "../../lists/groups/ToggleGroupExerciseList";
import { UserContext } from "../../project/Context";

export const GroupExercisesDialog = createDialog<{
  exerciseId: string;
}>()(
  React.memo(({ t }) => t("問題集をグループに公開")),
  React.memo(({ exerciseId }) => {
    const currentUser = useContext(UserContext);

    const { onReload: onReloadGroupExercises } = useSearch("GroupExercise", {
      exerciseId
    });

    return (
      <>
        <ExerciseContext.Provider value={exerciseId}>
          <ToggleGroupExerciseList
            initialParams={{
              userId: currentUser.id
            }}
            onReload={onReloadGroupExercises}
          />
        </ExerciseContext.Provider>
      </>
    );
  })
);
