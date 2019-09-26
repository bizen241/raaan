import * as React from "react";
import { Exercise } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { AttemptManager } from "../managers/AttemptManager";
import { createPlayerDialog } from "./PlayerDialog";

export const ExercisePreviewer = createPlayerDialog<{
  exercise: Params<Exercise>;
}>(
  React.memo(({ exercise, onClose }) => {
    return <AttemptManager exercise={exercise} onClose={onClose} />;
  })
);
