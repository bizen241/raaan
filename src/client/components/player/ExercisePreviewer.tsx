import * as React from "react";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { AttemptManager } from "./AttemptManager";

export const ExercisePreviewer = React.memo<{
  exercise: SaveParams<Exercise>;
  onClose: () => void;
}>(({ exercise, onClose }) => {
  return <AttemptManager exercise={exercise} onClose={onClose} />;
});
