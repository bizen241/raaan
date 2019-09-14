import * as React from "react";
import { Exercise } from "../../../../shared/api/entities";
import { SaveParams } from "../../../../shared/api/request/save";
import { AttemptManager } from "../managers/AttemptManager";
import { createPlayerDialog } from "./PlayerDialog";

export const ExercisePreviewer = createPlayerDialog<{
  exercise: SaveParams<Exercise>;
}>(
  React.memo(({ exercise, onClose }) => {
    return <AttemptManager exercise={exercise} onClose={onClose} />;
  })
);
