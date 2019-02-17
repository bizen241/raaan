import { Divider } from "@blueprintjs/core";
import * as React from "react";
import { ContentItemRendererProps } from ".";
import { KanjiItem } from "../../../../../shared/content";
import { Column, Row } from "../../../ui";
import { Chars } from "./chars/Chars";
import { TypedChars } from "./chars/TypedChars";
import { UntypedChars } from "./chars/UntypedChars";
import { TypedLines } from "./lines/TypedLines";
import { TypingLine } from "./lines/TypingLine";
import { UntypedLines } from "./lines/UntypedLines";

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
    <Column flex={1}>
      <Column flex={1}>
        <TypedLines value={kanjiLines.slice(0, typedLinesCount).join("\n")} />
        <Chars>{kanjiLines[typedLinesCount]}</Chars>
        <UntypedLines value={kanjiLines.slice(typedLinesCount + 1).join("\n")} />
      </Column>
      <Divider />
      <Row flex="none">
        <TypedChars value={typedSource} />
        <UntypedChars value={untypedSource} />
      </Row>
      <TypingLine untypedString={untypedString} typedString={typedString} hasTypo={hasTypo} />
    </Column>
  );
};
