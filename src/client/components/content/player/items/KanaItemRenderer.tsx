import { Divider } from "@blueprintjs/core";
import * as React from "react";
import { ExerciseItemRendererProps } from ".";
import { KanaItem } from "../../../../../shared/content";
import { Column } from "../../../ui";
import { TypedLines } from "./lines/TypedLines";
import { TypingKanaLine } from "./lines/TypingKanaLine";
import { TypingLine } from "./lines/TypingLine";
import { UntypedLines } from "./lines/UntypedLines";

export const KanaItemRenderer: React.FunctionComponent<ExerciseItemRendererProps<KanaItem>> = ({
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
        <TypingKanaLine untypedKana={untypedSource} typedKana={typedSource} />
        <UntypedLines value={kanaLines.slice(typedLinesCount + 1).join("\n")} />
      </Column>
      <Divider />
      <TypingLine untypedString={untypedString} typedString={typedString} hasTypo={hasTypo} />
    </Column>
  );
};
