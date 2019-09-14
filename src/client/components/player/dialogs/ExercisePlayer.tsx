import * as React from "react";
import { createDialog } from "../../dialogs";
import { ExerciseManager } from "../managers/ExerciseManager";

export const ExercisePlayer = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId, isOpen, onClose }) => {
    return <ExerciseManager exerciseId={exerciseId} isOpen={isOpen} onClose={onClose} />;
  })
);
