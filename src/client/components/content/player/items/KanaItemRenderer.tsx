import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { ContentItemRendererProps } from ".";
import { KanaItem } from "../../../../../shared/content";
import { Column, Row } from "../../../ui";
import { NextKey, TypedChars, TypedCharsWrapper, TypoKey, UntypedChars, UntypedCharsWrapper } from "./utils";

export const KanaItemRenderer: React.FunctionComponent<ContentItemRendererProps<KanaItem>> = ({
  untypedSource,
  untypedString,
  typedString,
  typedSource,
  hasTypo
}) => {
  const nextKey = untypedString[0];

  return (
    <Column>
      <Row>
        <TypedCharsWrapper>
          <TypedChars className={Classes.TEXT_DISABLED}>{typedSource}</TypedChars>
        </TypedCharsWrapper>
        <UntypedCharsWrapper>
          <UntypedChars>{untypedSource}</UntypedChars>
        </UntypedCharsWrapper>
      </Row>
      <Row>
        <TypedCharsWrapper>
          <TypedChars className={Classes.TEXT_DISABLED}>{typedString}</TypedChars>
        </TypedCharsWrapper>
        {hasTypo ? <TypoKey key={performance.now()}>{nextKey}</TypoKey> : <NextKey>{nextKey}</NextKey>}
        <UntypedCharsWrapper>
          <UntypedChars>{untypedString.slice(1)}</UntypedChars>
        </UntypedCharsWrapper>
      </Row>
    </Column>
  );
};