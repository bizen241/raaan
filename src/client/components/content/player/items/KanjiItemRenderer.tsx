import * as React from "react";
import { ContentItemRendererProps } from ".";
import { KanjiItem } from "../../../../../shared/content";
import { Chars, Column, Row } from "../../../ui";
import { TypedChars, UntypedCharsWrapper } from "./utils";

export const KanjiItemRenderer: React.FunctionComponent<ContentItemRendererProps<KanjiItem>> = ({
  item,
  untypedSource,
  untypedString,
  typedLines,
  typedString,
  typedSource
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
        <UntypedCharsWrapper>
          <Chars>{untypedString}</Chars>
        </UntypedCharsWrapper>
      </Row>
    </Column>
  );
};
