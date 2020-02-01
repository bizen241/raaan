import React from "react";
import { useEntity } from "../../../hooks/useEntity";
import { Loading } from "../../project/Loading";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./createPlayerDialog";

export const ExercisePlayer = createPlayerDialog<{
  exerciseId: string;
  contestId?: string;
}>(
  React.memo(({ exerciseId, contestId, onClose }) => {
    const { entity: exercise, ...exerciseProps } = useEntity("Exercise", exerciseId);
    if (exercise === undefined) {
      return <Loading {...exerciseProps} />;
    }

    return <SubmissionManager exercise={exercise} contestId={contestId} onClose={onClose} />;
  })
);
