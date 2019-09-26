import { CircularProgress } from "@material-ui/core";
import { Error } from "@material-ui/icons";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { Exercise, SubmissionSummary } from "../../../../shared/api/entities";
import { Params } from "../../../../shared/api/request/params";
import { Attempt, createAttempt, QuestionResult } from "../../../domain/exercise/attempt";
import { AttemptMessage } from "../renderers/AttemptMessage";
import { AttemptResultViewer } from "../renderers/ResultSummary";
import { QuestionManager } from "./QuestionManager";

export const AttemptManager = React.memo<{
  exercise: Params<Exercise>;
  submissionSummary?: SubmissionSummary;
  hasNext?: boolean;
  onNext?: () => void;
  onFinish?: (results: QuestionResult[]) => void;
  onClose: () => void;
}>(({ exercise, submissionSummary, hasNext, onNext, onFinish, onClose }) => {
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

  return isFinished ? (
    <AttemptResultViewer
      attempt={attempt}
      submissionSummary={submissionSummary}
      hasNext={hasNext}
      onReplay={onReplayExercise}
      onFinish={onFinishExercise}
    />
  ) : (
    <QuestionManager key={attempt.results.length} question={currentQuestion} onFinish={onFinishQuestion} />
  );
});
