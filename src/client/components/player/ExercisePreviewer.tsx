import * as React from "react";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { createDialog } from "../dialogs";
import { AttemptManager } from "./AttemptManager";

export const ExercisePreviewer = createDialog<{
  exercise: SaveParams<Exercise>;
}>(
  React.memo(({ exercise, onClose }) => {
    return <AttemptManager exercise={exercise} onClose={onClose} />;
  })
);
