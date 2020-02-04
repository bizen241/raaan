import React from "react";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { GroupContext, ToggleGroupExerciseList } from "../../lists/exercise-summaries/ToggleGroupExerciseList";

export const GroupExercisesDialog = createDialog<{
  groupId: string;
}>()(
  React.memo(({ t }) => t("問題集をグループに公開")),
  React.memo(({ groupId }) => {
    const currentUser = useCurrentUser();

    const { onReload: onReloadGroupExercises } = useSearch("GroupExercise", {
      groupId
    });

    return (
      <>
        <GroupContext.Provider value={groupId}>
          <ToggleGroupExerciseList
            initialParams={{
              authorId: currentUser.id
            }}
            onReload={onReloadGroupExercises}
          />
        </GroupContext.Provider>
      </>
    );
  })
);
