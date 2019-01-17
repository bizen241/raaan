import * as React from "react";
import { ContentItemRendererProps } from ".";
import { KanjiItem } from "../../../../../shared/content";
import { Chars, Column, Row } from "../../../ui";
import { TypedChars, TypoKey, UntypedCharsWrapper } from "./utils";

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

  return (
    <Column>
      <Column padding="small">
        {kanjiLines.slice(0, typedLinesCount).map((line, index) => (
          <Chars key={index} style={{ opacity: 0.5 }}>
            {line}
          </Chars>
        ))}
        {kanjiLines.slice(typedLinesCount).map((line, index) => (
          <Chars key={index + typedLinesCount}>{line}</Chars>
        ))}
      </Column>
      <Row padding="small">
        <TypedChars>{typedSource}</TypedChars>
        <UntypedCharsWrapper>
          <Chars>{untypedSource}</Chars>
        </UntypedCharsWrapper>
      </Row>
      <Row padding="small">
        <TypedChars>{typedString}</TypedChars>
        {!hasTypo ? <Chars>{untypedString[0]}</Chars> : <TypoKey key={performance.now()}>{untypedString[0]}</TypoKey>}
        <UntypedCharsWrapper>
          <Chars>{untypedString.slice(1)}</Chars>
        </UntypedCharsWrapper>
      </Row>
    </Column>
  );
};
