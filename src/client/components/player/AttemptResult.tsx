import { Box, Divider, makeStyles } from "@material-ui/core";
import { TrendingDown, TrendingFlat, TrendingUp } from "@material-ui/icons";
import * as React from "react";
import { AttemptResult, SubmissionSummary } from "../../../shared/api/entities";
import { Attempt, QuestionResult, summarizeResults } from "../../domain/exercise/attempt";

export const AttemptResultViewer: React.FunctionComponent<{
  attempt: Attempt;
  results: QuestionResult[];
  submissionSummary: SubmissionSummary | undefined;
}> = ({ results, submissionSummary }) => {
  const classes = useStyles();

  const attemptResult = summarizeResults(results);
  const speed = calcSpeed(attemptResult);

  const { typeCount, time, accuracy } = attemptResult;

  const speedDiff = submissionSummary && speed - calcSpeed(submissionSummary.latest);
  const accuracyDiff = submissionSummary && accuracy - submissionSummary.latest.accuracy;

  const speedDiffIcon = getDiffIcon(speedDiff);
  const accuracyDiffIcon = getDiffIcon(accuracyDiff);

  return (
    <Box display="flex" flex={1} justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column">
        <span className={classes.key}>タイプ数</span>
        <span className={classes.value}>{typeCount}</span>
        <Divider />
        <span className={classes.key}>時間</span>
        <span className={classes.value}>{(time / 1000).toFixed(2)}秒</span>
        <Divider />
        <span className={classes.key}>速さ</span>
        <span className={classes.value}>
          {speedDiffIcon}
          {speed.toFixed(0)}&nbsp;打/分
        </span>
        <Divider />
        <span className={classes.key}>正確性</span>
        <span className={classes.value}>
          {accuracyDiffIcon}
          {accuracy}&nbsp;%
        </span>
      </Box>
    </Box>
  );
};

const calcSpeed = (result: AttemptResult) => (result.typeCount / (result.time / 1000)) * 60;

const getDiffIcon = (diff: number | undefined) => {
  if (diff === undefined) {
    return undefined;
  } else if (diff > 0) {
    return <TrendingUp />;
  } else if (diff < 0) {
    return <TrendingDown />;
  } else {
    return <TrendingFlat />;
  }
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
