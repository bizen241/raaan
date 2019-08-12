import * as React from "react";
import { useMemo } from "react";
import { Question } from "../../../shared/api/entities";
import { AttemptManager } from "./AttemptManager";

export const QuestionPreviewer = React.memo<{
  question: Question;
  isOpen: boolean;
  onClose: () => void;
}>(({ question, isOpen, onClose }) => {
  const exercise = useMemo(
    () => ({
      questions: [question]
    }),
    [question]
  );

  return <AttemptManager exercise={exercise} isOpen={isOpen} onClose={onClose} />;
});
