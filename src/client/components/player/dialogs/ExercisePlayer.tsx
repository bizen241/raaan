import React from "react";
import { EntityId } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/useEntity";
import { Loading } from "../../project/Loading";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./createPlayerDialog";

export const ExercisePlayer = createPlayerDialog<{
  exerciseId: EntityId<"Exercise">;
  contestId?: EntityId<"Contest">;
}>(
  React.memo(({ exerciseId, contestId, onClose }) => {
    const { entity: exercise, ...exerciseProps } = useEntity("Exercise", exerciseId);
    if (exercise === undefined) {
      return <Loading {...exerciseProps} />;
    }

    return <SubmissionManager exercise={exercise} contestId={contestId} onClose={onClose} />;
  })
);
