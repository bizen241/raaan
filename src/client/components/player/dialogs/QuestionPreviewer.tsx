import React, { useMemo } from "react";
import { Question } from "../../../../shared/api/entities";
import { AttemptManager } from "../managers/AttemptManager";
import { createPlayerDialog } from "./createPlayerDialog";

export const QuestionPreviewer = createPlayerDialog<{
  question: Question;
}>(
  React.memo(({ question, onClose }) => {
    const exercise = useMemo(
      () => ({
        questions: [question]
      }),
      [question]
    );

    return <AttemptManager exercise={exercise} onClose={onClose} />;
  })
);
