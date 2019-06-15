import { Box, Divider, makeStyles } from "@material-ui/core";
import * as React from "react";
import { calculateScore } from "../../../shared/exercise/score";
import { Attempt, getKeystrokesFromResults, getTotalTime, QuestionResult } from "../../domain/exercise/attempt";

export const AttemptResult: React.FunctionComponent<{
  attempt: Attempt;
  results: QuestionResult[];
}> = ({ results }) => {
  const time = getTotalTime(results);
  const keystrokes = getKeystrokesFromResults(results);

  const speed = (keystrokes / (time / 1000)) * 60;
  const score = calculateScore({
    keystrokes,
    time,
    accuracy: 100
  });

  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box display="flex" flexDirection="column">
        <span className={classes.key}>スコア</span>
        <span className={classes.value}>{score}</span>
        <Divider />
        <span className={classes.key}>時間</span>
        <span className={classes.value}>{(time / 1000).toFixed(2)}秒</span>
        <Divider />
        <span className={classes.key}>速さ</span>
        <span className={classes.value}>{speed.toFixed(0)}&nbsp;打/分</span>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  key: {
    height: "1.5em",
    fontSize: "2vmax"
  },
  value: {
    height: "1.5em",
    fontSize: "4vmax"
  }
}));
