import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useSearch } from "../../../hooks/useSearch";
import { ToggleGroupExerciseList } from "../../lists/exercise-summaries/ToggleGroupExerciseList";

export const GroupExercisesDialog = createDialog<{
  groupId: EntityId<"Group">;
}>()(
  React.memo(({ t }) => t("問題集をグループに公開")),
  React.memo(({ groupId }) => {
    const { currentUser } = useCurrentUser();

    const { onReload: onReloadGroupExercises } = useSearch("GroupExercise", {
      groupId
    });

    return (
      <ToggleGroupExerciseList
        initialParams={{
          authorId: currentUser.id
        }}
        groupId={groupId}
        onReload={onReloadGroupExercises}
      />
    );
  })
);
