import * as React from "react";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./PlayerDialog";

export const ExercisePlayer = createPlayerDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, onClose }) => {
    return <SubmissionManager entityId={exerciseId} onClose={onClose} />;
  })
);
