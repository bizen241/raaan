import { Box, CircularProgress, IconButton } from "@material-ui/core";
import { Error, Settings } from "@material-ui/icons";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { Exercise, SubmissionSummary } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { Attempt, createAttempt, QuestionResult } from "../../domain/exercise/attempt";
import { createDialog, DialogHeader } from "../dialogs";
import { AttemptMessage } from "./AttemptMessage";
import { AttemptResultViewer } from "./AttemptResult";
import { QuestionPlayer } from "./QuestionPlayer";

export const AttemptManager = createDialog<{
  exercise: SaveParams<Exercise>;
  submissionSummary?: SubmissionSummary;
  hasNext?: boolean;
  onNext?: () => void;
  onFinish?: (results: QuestionResult[]) => void;
}>(
  React.memo(({ exercise, submissionSummary, hasNext, onNext, onFinish, onClose }) => {
    const [attempt, updateAttempt] = useState<Attempt>();
    const isFinished = attempt && attempt.plan.length === attempt.results.length;

    const onFinishQuestion = useCallback(
      (result: QuestionResult) =>
        updateAttempt(
          s =>
            s && {
              ...s,
              results: [...s.results, result]
            }
        ),
      []
    );
    const onReplayExercise = useCallback(
      () =>
        updateAttempt(
          s =>
            s && {
              ...s,
              results: []
            }
        ),
      []
    );
    const onFinishExercise = useCallback(() => (hasNext ? onNext && onNext() : onClose()), [hasNext]);

    useEffect(() => {
      updateAttempt(createAttempt(exercise.questions || []));
    }, [exercise]);
    useEffect(() => {
      if (isFinished && onFinish !== undefined && attempt !== undefined) {
        onFinish(attempt.results);
      }
    }, [isFinished]);

    if (attempt === undefined) {
      return <AttemptMessage icon={<CircularProgress />} title="コンパイル中です" onClose={onClose} />;
    }
    if (attempt.questions.length === 0) {
      return <AttemptMessage icon={<Error />} title="空の問題集です" onClose={onClose} />;
    }

    const currentQuestionIndex = attempt.plan[attempt.results.length];
    const currentQuestion = attempt.questions[currentQuestionIndex];

    return (
      <>
        <DialogHeader maxWidth="2000px" onClose={onClose}>
          <Box flex={1} />
          <IconButton edge="end" color="inherit">
            <Settings />
          </IconButton>
        </DialogHeader>
        {isFinished ? (
          <AttemptResultViewer
            attempt={attempt}
            submissionSummary={submissionSummary}
            hasNext={hasNext}
            onReplay={onReplayExercise}
            onFinish={onFinishExercise}
          />
        ) : (
          <QuestionPlayer key={attempt.results.length} question={currentQuestion} onFinish={onFinishQuestion} />
        )}
      </>
    );
  })
);
