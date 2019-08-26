import * as React from "react";
import { useCallback } from "react";
import { TraceQuestion } from "../../../../shared/api/entities";
import { HighlightedTextField } from "./HighlightedTextField";
import { QuestionEditorProps } from "./QuestionEditor";

export const TraceQuestionEditor = React.memo<QuestionEditorProps<TraceQuestion>>(({ question, onUpdate }) => {
  return (
    <HighlightedTextField value={question.value} onChange={useCallback((value: string) => onUpdate({ value }), [])} />
  );
});
