import React from "react";
import { useEntity } from "../../../hooks/useEntity";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./createPlayerDialog";

export const ExercisePlayer = createPlayerDialog<{
  exerciseId: string;
  contestId?: string;
}>(
  React.memo(({ exerciseId, contestId, onClose }) => {
    const { entity: exercise } = useEntity("Exercise", exerciseId);

    if (exercise === undefined) {
      return null;
    }

    return <SubmissionManager exercise={exercise} contestId={contestId} onClose={onClose} />;
  })
);
