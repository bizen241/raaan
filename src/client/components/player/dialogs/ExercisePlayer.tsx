import * as React from "react";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./PlayerDialog";

export const ExercisePlayer = createPlayerDialog<{
  exerciseId: string;
  contestId?: string;
}>(
  React.memo(({ exerciseId, contestId, onClose }) => {
    return <SubmissionManager entityId={exerciseId} contestId={contestId} onClose={onClose} />;
  })
);
