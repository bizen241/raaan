import * as React from "react";
import { PlayerState } from "../../../reducers/player";
import { Chars, Column } from "../../ui";

export const AttemptResultRenderer: React.FunctionComponent<{
  attempt: PlayerState;
}> = ({ attempt: { results } }) => {
  const totalTime = results.reduce((time, result) => time + result.time, 0) / 1000;
  const totalTypeCount = results.reduce((typeCount, result) => typeCount + result.typeCount, 0);
  const typeSpeed = totalTypeCount / totalTime;

  return (
    <Column>
      <Chars>時間: {totalTime.toFixed(2)}秒</Chars>
      <Chars>速さ: {typeSpeed.toFixed(2)}打/秒</Chars>
    </Column>
  );
};
