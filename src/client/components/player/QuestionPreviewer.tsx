import * as React from "react";
import { useMemo } from "react";
import { Question } from "../../../shared/api/entities";
import { AttemptManager } from "./AttemptManager";

export const QuestionPreviewer = React.memo<{
  question: Question;
  onClose: () => void;
}>(({ question, onClose }) => {
  const exercise = useMemo(
    () => ({
      questions: [question]
    }),
    [question]
  );

  return <AttemptManager exercise={exercise} onClose={onClose} />;
});
