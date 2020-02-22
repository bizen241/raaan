import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/useEntity";
import { Column, Link } from "../ui";

export const PlaylistItemExerciseSummaryViewer = React.memo<{
  exerciseSummaryId: EntityId<"ExerciseSummary">;
}>(({ exerciseSummaryId }) => {
  const { entity: exerciseSummary } = useEntity("ExerciseSummary", exerciseSummaryId, false);

  return (
    <Column>
      <Link label={exerciseSummary.title} to={`/exercises/${exerciseSummary.exerciseId}`} />
    </Column>
  );
});
