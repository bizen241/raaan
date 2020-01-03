import { PlayArrow } from "@material-ui/icons";
import * as React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { ExercisePreviewer } from "../player/dialogs/ExercisePreviewer";
import { Button, Column } from "../ui";
import { SuggestionSummaryViewer } from "./SuggestionSummaryViewer";

export const SuggestionViewer = withEntity("Suggestion")(
  React.memo(({ entity: suggestion }) => {
    const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();

    return (
      <Column>
        <Button icon={<PlayArrow />} label="プレビュー" onClick={onToggleExercisePreviewer} />
        <SuggestionSummaryViewer entityId={suggestion.summaryId} />
        <ExercisePreviewer exercise={suggestion} isOpen={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer} />
      </Column>
    );
  })
);
