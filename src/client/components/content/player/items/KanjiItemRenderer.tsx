import { Divider } from "@blueprintjs/core";
import * as React from "react";
import { QuestionRendererProps } from ".";
import { KanjiItem } from "../../../../../shared/content";
import { Column } from "../../../ui";
import { TypedLines } from "./lines/TypedLines";
import { TypingKanaLine } from "./lines/TypingKanaLine";
import { TypingKanjiLine } from "./lines/TypingKanjiLine";
import { TypingLine } from "./lines/TypingLine";
import { UntypedLines } from "./lines/UntypedLines";

export const KanjiItemRenderer: React.FunctionComponent<QuestionRendererProps<KanjiItem>> = ({
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
        <TypingKanjiLine value={kanjiLines[typedLinesCount]} />
        <UntypedLines value={kanjiLines.slice(typedLinesCount + 1).join("\n")} />
      </Column>
      <Divider />
      <TypingKanaLine untypedKana={untypedSource} typedKana={typedSource} />
      <TypingLine untypedString={untypedString} typedString={typedString} hasTypo={hasTypo} />
    </Column>
  );
};
