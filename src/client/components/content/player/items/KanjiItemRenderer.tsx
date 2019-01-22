import { Classes } from "@blueprintjs/core";
import * as React from "react";
import { ContentItemRendererProps } from ".";
import { KanjiItem } from "../../../../../shared/content";
import { Column, Row } from "../../../ui";
import {
  NextKey,
  TypedChars,
  TypedCharsWrapper,
  TypingChars,
  TypoKey,
  UntypedChars,
  UntypedCharsWrapper
} from "./utils";

export const KanjiItemRenderer: React.FunctionComponent<ContentItemRendererProps<KanjiItem>> = ({
  item,
  untypedSource,
  untypedString,
  typedLines,
  typedString,
  typedSource,
  hasTypo
}) => {
  const typedLinesCount = typedLines.length;
  const kanjiLines = item.kanji.split("\n");
  const nextKey = untypedString[0];

  return (
    <Column>
      <Column padding="small">
        {kanjiLines.slice(0, typedLinesCount).map((line, index) => (
          <TypingChars key={index} className={Classes.TEXT_DISABLED}>
            {line}
          </TypingChars>
        ))}
        <TypingChars style={{ fontSize: "4vmax", lineHeight: "1.5em" }}>{kanjiLines[typedLinesCount]}</TypingChars>
        {kanjiLines.slice(typedLinesCount + 1).map((line, index) => (
          <TypingChars key={index + typedLinesCount}>{line}</TypingChars>
        ))}
      </Column>
      <Row>
        <TypedCharsWrapper>
          <TypedChars small className={Classes.TEXT_DISABLED}>
            {typedSource}
          </TypedChars>
        </TypedCharsWrapper>
        <UntypedCharsWrapper>
          <UntypedChars small>{untypedSource}</UntypedChars>
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
