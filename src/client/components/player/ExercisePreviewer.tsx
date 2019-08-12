import * as React from "react";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { AttemptManager } from "./AttemptManager";

export const ExercisePreviewer = React.memo<{
  exercise: SaveParams<Exercise>;
  isOpen: boolean;
  onClose: () => void;
}>(({ exercise, isOpen, onClose }) => {
  return <AttemptManager exercise={exercise} isOpen={isOpen} onClose={onClose} />;
});
