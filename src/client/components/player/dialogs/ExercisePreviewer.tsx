import React from "react";
import { ExerciseContent } from "../../../../shared/api/entities";
import { AttemptManager } from "../managers/AttemptManager";
import { createPlayerDialog } from "./createPlayerDialog";

export const ExercisePreviewer = createPlayerDialog<{
  exercise: Partial<ExerciseContent>;
}>(
  React.memo(({ exercise, onClose }) => {
    return <AttemptManager exercise={exercise} onClose={onClose} />;
  })
);
