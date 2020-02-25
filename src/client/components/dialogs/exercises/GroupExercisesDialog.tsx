import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { ToggleGroupExerciseList } from "../../lists/groups/ToggleGroupExerciseList";

export const GroupExercisesDialog = createDialog<{
  exerciseId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("問題集をグループに公開")),
  React.memo(({ exerciseId }) => {
    const { currentUserId } = useCurrentUser();

    const { onReload: onReloadGroupExercises } = useSearch("GroupExercise", {
      exerciseId
    });

    return (
      <ToggleGroupExerciseList
        initialParams={{
          userId: currentUserId
        }}
        exerciseId={exerciseId}
        onReload={onReloadGroupExercises}
      />
    );
  })
);
