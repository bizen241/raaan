import { Box, Divider, makeStyles } from "@material-ui/core";
import * as React from "react";
import { Attempt, getTotalTime, getTotalTypeCount, QuestionResult } from "../../domain/exercise/attempt";

export const AttemptResult: React.FunctionComponent<{
  attempt: Attempt;
  results: QuestionResult[];
}> = ({ results }) => {
  const totalTime = getTotalTime(results) / 1000;
  const totalTypeCount = getTotalTypeCount(results);

  const typeSpeed = totalTypeCount / totalTime;
  const score = typeSpeed * 1 * 60;

  const classes = useStyles();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100%">
      <Box display="flex" flexDirection="column">
        <span className={classes.key}>スコア</span>
        <span className={classes.value}>{score.toFixed(0)}</span>
        <Divider />
        <span className={classes.key}>時間</span>
        <span className={classes.value}>{totalTime.toFixed(2)}秒</span>
        <Divider />
        <span className={classes.key}>速さ</span>
        <span className={classes.value}>{typeSpeed.toFixed(2)}打/秒</span>
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
