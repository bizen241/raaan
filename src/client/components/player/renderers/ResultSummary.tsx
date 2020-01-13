import { makeStyles } from "@material-ui/core";
import { ArrowForward, Keyboard, Replay, TrendingDown, TrendingFlat, TrendingUp } from "@material-ui/icons";
import React from "react";
import { AttemptResult, SubmissionSummary } from "../../../../shared/api/entities";
import { Attempt, summarizeResults } from "../../../domain/exercise/attempt";
import { Button, Card, Column, Row } from "../../ui";

export const AttemptResultViewer: React.FunctionComponent<{
  attempt: Attempt;
  submissionSummary: SubmissionSummary | undefined;
  hasNext?: boolean;
  onReplay: () => void;
  onFinish: () => void;
}> = ({ attempt: { results }, submissionSummary, hasNext, onReplay, onFinish }) => {
  const speedClasses = useSpeedStyles();

  const attemptResult = summarizeResults(results);
  const speed = calcSpeed(attemptResult);

  const speedDiff = submissionSummary && speed - calcSpeed(submissionSummary.latest);
  const SpeedDiffIcon = getDiffIcon(speedDiff);

  return (
    <Column alignItems="center">
      <Column width="100%" maxWidth="1000px" p={1}>
        <Card icon={<Keyboard />} title="結果">
          <Row justifyContent="center" alignItems="center">
            {SpeedDiffIcon && <SpeedDiffIcon className={speedClasses.icon} />}
            <span className={speedClasses.speed}>{speed.toFixed(0)}</span>
            <span className={speedClasses.unit}>打/分</span>
          </Row>
        </Card>
        <Button icon={<Replay />} label="もう一度" onClick={onReplay} />
        <Button color="primary" icon={<ArrowForward />} label={hasNext ? "次へ" : "終了"} onClick={onFinish} />
      </Column>
    </Column>
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
