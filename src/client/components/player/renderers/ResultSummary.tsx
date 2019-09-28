import { Avatar, Box, Card, CardContent, CardHeader, IconButton, makeStyles, Typography } from "@material-ui/core";
import {
  ArrowForward,
  InsertChart,
  Keyboard,
  Replay,
  TrendingDown,
  TrendingFlat,
  TrendingUp
} from "@material-ui/icons";
import * as React from "react";
import { AttemptResult, SubmissionSummary } from "../../../../shared/api/entities";
import { Attempt, summarizeResults } from "../../../domain/exercise/attempt";
import { Button, Column, DialogContent, Row } from "../../ui";
import { useStyles } from "../../ui/styles";

export const AttemptResultViewer: React.FunctionComponent<{
  attempt: Attempt;
  submissionSummary: SubmissionSummary | undefined;
  hasNext?: boolean;
  onReplay: () => void;
  onFinish: () => void;
}> = ({ attempt: { results }, submissionSummary, hasNext, onReplay, onFinish }) => {
  const classes = useStyles();
  const speedClasses = useSpeedStyles();

  const attemptResult = summarizeResults(results);
  const speed = calcSpeed(attemptResult);

  const speedDiff = submissionSummary && speed - calcSpeed(submissionSummary.latest);
  const SpeedDiffIcon = getDiffIcon(speedDiff);

  return (
    <DialogContent>
      <Column flex={1} justifyContent="center">
        <Column pb={1}>
          <Card>
            <CardHeader
              avatar={
                <Avatar className={classes.cardAvatar}>
                  <Keyboard />
                </Avatar>
              }
              title={<Typography>結果</Typography>}
              action={
                <IconButton>
                  <InsertChart />
                </IconButton>
              }
            />
            <CardContent>
              <Row flex={1} justifyContent="center" alignItems="center">
                {SpeedDiffIcon && <SpeedDiffIcon className={speedClasses.icon} />}
                <Box>
                  <span className={speedClasses.speed}>{speed.toFixed(0)}</span>
                  <span className={speedClasses.unit}>打/分</span>
                </Box>
              </Row>
            </CardContent>
          </Card>
        </Column>
        <Column pb={1}>
          <Button icon={<Replay />} label="もう一度" onClick={onReplay} />
        </Column>
        <Column pb={1}>
          <Button color="primary" icon={<ArrowForward />} label={hasNext ? "次へ" : "終了"} onClick={onFinish} />
        </Column>
      </Column>
    </DialogContent>
  );
};

const calcSpeed = (result: AttemptResult) => (result.typeCount / (result.time / 1000)) * 60;

const getDiffIcon = (diff: number | undefined) => {
  if (diff === undefined) {
    return undefined;
  } else if (diff > 0) {
    return TrendingUp;
  } else if (diff < 0) {
    return TrendingDown;
  } else {
    return TrendingFlat;
  }
};

const useSpeedStyles = makeStyles(() => ({
  icon: {
    fontSize: "3vmax",
    paddingRight: "8px"
  },
  speed: {
    fontSize: "4vmax",
    paddingRight: "8px"
  },
  unit: {
    fontSize: "3vmax"
  }
}));
