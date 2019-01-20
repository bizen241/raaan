import * as React from "react";
import { PlayerState } from "../../../reducers/player";
import { Chars, Column, DottedSeparator, DoubleSeparator } from "../../ui";

export const AttemptResultRenderer: React.FunctionComponent<{
  attempt: PlayerState;
}> = ({ attempt: { results } }) => {
  const totalTime = results.reduce((time, result) => time + result.time, 0) / 1000;
  const totalTypeCount = results.reduce((typeCount, result) => typeCount + result.typeCount, 0);
  const typeSpeed = totalTypeCount / totalTime;
  const score = typeSpeed * 1 * 60;

  return (
    <Column>
      <Column center="cross" padding="medium">
        <Chars size="small">スコア</Chars>
        <Column padding="small">
          <Chars size="large">{score.toFixed(0)}</Chars>
        </Column>
      </Column>
      <DoubleSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">時間</Chars>
        <Column padding="small">
          <Chars>{totalTime.toFixed(2)}&nbsp;秒</Chars>
        </Column>
      </Column>
      <DottedSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">スピード</Chars>
        <Column padding="small">
          <Chars>{typeSpeed.toFixed(2)}&nbsp;打/秒</Chars>
        </Column>
      </Column>
      <DoubleSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">正確性</Chars>
        <Column padding="small">
          <Chars>??&nbsp;%</Chars>
        </Column>
      </Column>
      <DottedSeparator />
      <Column center="cross" padding="small">
        <Chars size="small">ミス</Chars>
        <Column padding="small">
          <Chars>?&nbsp;?&nbsp;?</Chars>
        </Column>
      </Column>
    </Column>
  );
};
