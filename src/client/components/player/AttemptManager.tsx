import { Box, CircularProgress, IconButton } from "@material-ui/core";
import { Error, Replay } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { useCallback, useEffect, useState } from "react";
import * as React from "react";
import { Exercise } from "../../../shared/api/entities";
import { SaveParams } from "../../../shared/api/request/save";
import { compileQuestions } from "../../../shared/exercise/compiler";
import { Attempt, createPlan, QuestionResult } from "../../domain/exercise/attempt";
import { createDialog, DialogHeader } from "../dialogs";
import { AttemptMessage } from "./AttemptMessage";
import { AttemptResult } from "./AttemptResult";
import { QuestionPlayer } from "./QuestionPlayer";

export const AttemptManager = createDialog<{
  exercise: SaveParams<Exercise>;
  onFinish?: (results: QuestionResult[]) => void;
}>(
  React.memo(({ exercise, onFinish, onClose }) => {
    const classes = useStyles();

    const [attempt, setAttempt] = useState<Attempt>();
    const [results, updateResults] = useState<QuestionResult[]>([]);

    const isFinished = attempt && attempt.plan.length === results.length;
    const onNext = useCallback((result: QuestionResult) => updateResults(s => [...s, result]), []);
    const onReset = useCallback(() => updateResults([]), []);

    useEffect(() => {
      if (exercise !== undefined) {
        const rawQuestions = exercise.questions || [];

        setAttempt({
          questions: compileQuestions(rawQuestions),
          plan: createPlan(rawQuestions)
        });
      }
    }, [exercise]);
    useEffect(() => {
      if (isFinished && onFinish !== undefined) {
        onFinish(results);
      }
    }, [isFinished]);

    if (attempt === undefined) {
      return <AttemptMessage icon={<CircularProgress />} title="コンパイル中です" onClose={onClose} />;
    }
    if (attempt.questions.length === 0) {
      return <AttemptMessage icon={<Error />} title="空の問題集です" onClose={onClose} />;
    }

    const currentQuestionIndex = attempt.plan[results.length];
    const currentQuestion = attempt.questions[currentQuestionIndex];

    return (
      <>
        <DialogHeader maxWidth="2000px" onClose={onClose}>
          <Box flex={1} />
          <IconButton edge="end" color="inherit" onClick={onReset}>
            <Replay />
          </IconButton>
        </DialogHeader>
        <Box className={classes.outer} display="flex" flexDirection="column" alignItems="center" px={2} py={1}>
          <Box className={classes.inner} display="flex" flexDirection="column" maxWidth="2000px">
            {isFinished ? (
              <AttemptResult attempt={attempt} results={results} />
            ) : (
              <QuestionPlayer key={results.length} question={currentQuestion} onFinish={onNext} />
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
