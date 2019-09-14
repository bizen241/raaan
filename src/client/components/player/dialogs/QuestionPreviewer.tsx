import * as React from "react";
import { useMemo } from "react";
import { Question } from "../../../../shared/api/entities";
import { createDialog } from "../../dialogs";
import { AttemptManager } from "../managers/AttemptManager";

export const QuestionPreviewer = createDialog<{
  question: Question;
}>(
  React.memo(({ question, isOpen, onClose }) => {
    const exercise = useMemo(
      () => ({
        questions: [question]
      }),
      [question]
    );

    return <AttemptManager exercise={exercise} isOpen={isOpen} onClose={onClose} />;
  })
);
