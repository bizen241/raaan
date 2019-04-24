import * as React from "react";
import { CompiledQuestion } from "../../../domain/content/compiler";
import { Column } from "../../ui";
import { QuestionPlayerState } from "../player/QuestionPlayer";

export const QuestionRenderer = React.memo<{
  question: CompiledQuestion;
  state: QuestionPlayerState;
}>(() => {
  return <Column />;
});
