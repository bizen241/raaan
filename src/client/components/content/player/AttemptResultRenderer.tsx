import { Divider } from "@blueprintjs/core";
import * as React from "react";
import { PlayerState } from "../../../reducers/player";
import { styled } from "../../../style";
import { Column, Row } from "../../ui";

const IndexType = styled(Row)`
  font-size: 2vmax;
  line-height: 1.5em;
`;

const Padding = styled(Row)`
  flex: 1;
  min-width: 2em;
`;

const IndexValue = styled(Row)`
  font-size: 3vmax;
  line-height: 1.5em;
`;

export const AttemptResultRenderer: React.FunctionComponent<{
  attempt: PlayerState;
}> = ({ attempt: { results } }) => {
  const totalTime = results.reduce((time, result) => time + result.time, 0) / 1000;
  const totalTypeCount = results.reduce((typeCount, result) => typeCount + result.typeCount, 0);
  const typeSpeed = totalTypeCount / totalTime;
  const score = typeSpeed * 1 * 60;

  return (
    <Column center="main">
      <Row center="cross" isResponsive={true}>
        <IndexType>スコア</IndexType>
        <Padding />
        <IndexValue>{score.toFixed(0)}</IndexValue>
      </Row>
      <Divider />
      <Row center="cross" isResponsive={true}>
        <IndexType>時間</IndexType>
        <Padding />
        <IndexValue>{totalTime.toFixed(2)}&nbsp;秒</IndexValue>
      </Row>
      <Divider />
      <Row center="cross" isResponsive={true}>
        <IndexType>スピード</IndexType>
        <Padding />
        <IndexValue>{typeSpeed.toFixed(2)}&nbsp;打/秒</IndexValue>
      </Row>
      <Divider />
      <Row center="cross" isResponsive={true}>
        <IndexType>正確性</IndexType>
        <Padding />
        <IndexValue>??&nbsp;%</IndexValue>
      </Row>
    </Column>
  );
};
