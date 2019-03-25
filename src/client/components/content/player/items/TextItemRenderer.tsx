import * as React from "react";
import { QuestionRendererProps } from ".";
import { TextItem } from "../../../../../shared/content";
import { Column } from "../../../ui";
import { TypedLines } from "./lines/TypedLines";
import { TypingLine } from "./lines/TypingLine";
import { UntypedLines } from "./lines/UntypedLines";

export const TextItemRenderer: React.FunctionComponent<QuestionRendererProps<TextItem>> = ({
  item,
  untypedString,
  typedLines,
  typedString,
  hasTypo
}) => {
  const typedLinesCount = typedLines.length;
  const textLines = item.value.split("\n");

  return (
    <Column flex={1}>
      <TypedLines value={textLines.slice(0, typedLinesCount).join("\n")} />
      <TypingLine untypedString={untypedString} typedString={typedString} hasTypo={hasTypo} />
      <UntypedLines value={textLines.slice(typedLinesCount + 1).join("\n")} />
    </Column>
  );
};
