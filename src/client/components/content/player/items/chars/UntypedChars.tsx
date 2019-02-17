import * as React from "react";
import { Row } from "../../../../ui";
import { Chars } from "./Chars";

export const UntypedChars: React.FunctionComponent<{
  value: string;
}> = ({ value }) => {
  return (
    <Row>
      <Chars>{value}</Chars>
    </Row>
  );
};
