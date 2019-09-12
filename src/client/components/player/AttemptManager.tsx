import { Box, CircularProgress, IconButton } from "@material-ui/core";
import { Error, Replay } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
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
  onNext?: () => void;
  onFinish?: (results: QuestionResult[]) => void;
}>(
  React.memo(({ exercise, submissionSummary, onFinish, onClose }) => {
    const classes = useStyles();

    const [attempt, updateAttempt] = useState<Attempt>();
    const isFinished = attempt && attempt.plan.length === attempt.results.length;

    const onNext = useCallback(
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
    const onReset = useCallback(
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
          <IconButton edge="end" color="inherit" onClick={onReset}>
            <Replay onClick={onReset} />
          </IconButton>
        </DialogHeader>
        <Box className={classes.outer} display="flex" flexDirection="column" alignItems="center" px={2} py={1}>
          <Box className={classes.inner} display="flex" flexDirection="column">
            {isFinished ? (
              <AttemptResultViewer attempt={attempt} submissionSummary={submissionSummary} />
            ) : (
              <QuestionPlayer key={attempt.results.length} question={currentQuestion} onFinish={onNext} />
            )}
          </Box>
        </Box>
      </>
    );
  })
);

const useStyles = makeStyles(() => ({
  outer: {
    height: "100%",
    overflowY: "hidden"
  },
  inner: {
    height: "100%",
    width: "100%",
    maxWidth: "2000px",
    overflowY: "hidden"
  }
}));
