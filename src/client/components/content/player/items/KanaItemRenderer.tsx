import { Divider } from "@blueprintjs/core";
import * as React from "react";
import { ContentItemRendererProps } from ".";
import { KanaItem } from "../../../../../shared/content";
import { Column, Row } from "../../../ui";
import { TypedChars } from "./chars/TypedChars";
import { UntypedChars } from "./chars/UntypedChars";
import { TypedLines } from "./lines/TypedLines";
import { TypingLine } from "./lines/TypingLine";
import { UntypedLines } from "./lines/UntypedLines";

export const KanaItemRenderer: React.FunctionComponent<ContentItemRendererProps<KanaItem>> = ({
  item,
  untypedSource,
  untypedString,
  typedLines,
  typedString,
  typedSource,
  hasTypo
}) => {
  const typedLinesCount = typedLines.length;
  const kanaLines = item.value.split("\n");

  return (
    <Column flex={1}>
      <Column flex={1}>
        <TypedLines value={kanaLines.slice(0, typedLinesCount).join("\n")} />
        <Row flex="none">
          <TypedChars value={typedSource} />
          <UntypedChars value={untypedSource} />
        </Row>
        <UntypedLines value={kanaLines.slice(typedLinesCount + 1).join("\n")} />
      </Column>
      <Divider />
      <TypingLine untypedString={untypedString} typedString={typedString} hasTypo={hasTypo} />
    </Column>
  );
};
