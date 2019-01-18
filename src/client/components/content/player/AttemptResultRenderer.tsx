import * as React from "react";
import { PlayerState } from "../../../reducers/player";
import { Chars, Column, DottedSeparator, DoubleSeparator } from "../../ui";

export const AttemptResultRenderer: React.FunctionComponent<{
  attempt: PlayerState;
}> = ({ attempt: { results } }) => {
  const totalTime = results.reduce((time, result) => time + result.time, 0) / 1000;
  const totalTypeCount = results.reduce((typeCount, result) => typeCount + result.typeCount, 0);
  const typeSpeed = totalTypeCount / totalTime;
  const score = typeSpeed * 0.86 * 60;

  return (
    <Column>
      <Column center="cross" padding="medium">
        <Chars size="small">スコア</Chars>
        <Chars size="large">{score.toFixed(0)}</Chars>
      </Column>
      <DoubleSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">時間</Chars>
        <Chars>{totalTime.toFixed(2)}&nbsp;秒</Chars>
      </Column>
      <DottedSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">スピード</Chars>
        <Chars>{typeSpeed.toFixed(2)}&nbsp;打/秒</Chars>
      </Column>
      <DoubleSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">正確性</Chars>
        <Chars>86&nbsp;%</Chars>
      </Column>
      <DottedSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">ミス</Chars>
        <Chars>K&nbsp;S&nbsp;V</Chars>
      </Column>
    </Column>
  );
};
