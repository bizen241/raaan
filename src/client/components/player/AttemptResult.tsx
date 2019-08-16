import { Box, Divider, makeStyles } from "@material-ui/core";
import * as React from "react";
import { getScore } from "../../../shared/exercise";
import { Attempt, QuestionResult, summarizeResults } from "../../domain/exercise/attempt";

export const AttemptResult: React.FunctionComponent<{
  attempt: Attempt;
  results: QuestionResult[];
}> = ({ results }) => {
  const { time, typeCount, accuracy } = summarizeResults(results);

  const speed = (typeCount / (time / 1000)) * 60;
  const score = getScore({
    typeCount,
    time,
    accuracy
  });

  const classes = useStyles();

  return (
    <Box display="flex" flex={1} justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column">
        <span className={classes.key}>スコア</span>
        <span className={classes.value}>{score}</span>
        <Divider />
        <span className={classes.key}>時間</span>
        <span className={classes.value}>{(time / 1000).toFixed(2)}秒</span>
        <Divider />
        <span className={classes.key}>速さ</span>
        <span className={classes.value}>{speed.toFixed(0)}&nbsp;打/分</span>
        <Divider />
        <span className={classes.key}>正確性</span>
        <span className={classes.value}>{accuracy}&nbsp;%</span>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles(() => ({
  key: {
    fontSize: "2vmax",
    marginTop: "0.5em"
  },
  value: {
    fontSize: "4vmax"
  }
}));
