import * as React from "react";
import { useMemo } from "react";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { AttemptManager } from "./AttemptManager";

export const ExercisePreviewer = React.memo<{
  buffer: SaveParams<Exercise>;
  questionIndex?: number;
  onClose: () => void;
}>(({ buffer, questionIndex, onClose }) => {
  const questions = buffer.questions || [];

  const exercise = useMemo(
    () => ({
      ...buffer,
      questions: questionIndex === undefined ? questions : [questions[questionIndex]]
    }),
    [questionIndex]
  );

  return <AttemptManager exercise={exercise} onClose={onClose} />;
});
