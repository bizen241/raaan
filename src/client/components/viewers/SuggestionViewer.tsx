import { Check, Clear, PlayArrow } from "@material-ui/icons";
import React from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { ConfirmAcceptSuggestionDialog } from "../dialogs/suggestions/ConfirmAcceptSuggestionDialog";
import { RejectSuggestionDialog } from "../dialogs/suggestions/RejectSuggestionDialog";
import { ExercisePreviewer } from "../player/dialogs/ExercisePreviewer";
import { Loading } from "../project/Loading";
import { Button, Column } from "../ui";
import { SuggestionSummaryViewer } from "./SuggestionSummaryViewer";

export const SuggestionViewer = withEntity("Suggestion")(
  React.memo(({ entity: suggestion }) => {
    const currentUser = useCurrentUser();

    const [isAcceptDialogOpen, onToggleAcceptDialog] = useToggleState();
    const [isRejectDialogOpen, onToggleRejectDialog] = useToggleState();
    const [isExercisePreviewerOpen, onToggleExercisePreviewer] = useToggleState();

    const { entity: exercise, ...exerciseProps } = useEntity("Exercise", suggestion.exerciseId);
    if (exercise === undefined) {
      return <Loading {...exerciseProps} />;
    }

    const isTargetAuthor = exercise.authorId === currentUser.id;
    const isPending = suggestion.state === "pending";

    return (
      <Column>
        {isTargetAuthor && isPending && (
          <Button color="primary" icon={<Check />} label="採用する" onClick={onToggleAcceptDialog} />
        )}
        {isTargetAuthor && isPending && <Button icon={<Clear />} label="却下する" onClick={onToggleRejectDialog} />}
        <Button icon={<PlayArrow />} label="プレビュー" onClick={onToggleExercisePreviewer} />
        <SuggestionSummaryViewer entityId={suggestion.summaryId} />
        <ConfirmAcceptSuggestionDialog
          suggestion={suggestion}
          isOpen={isAcceptDialogOpen}
          onClose={onToggleAcceptDialog}
        />
        <RejectSuggestionDialog
          suggestionId={suggestion.id}
          isOpen={isRejectDialogOpen}
          onClose={onToggleRejectDialog}
        />
        <ExercisePreviewer exercise={suggestion} isOpen={isExercisePreviewerOpen} onClose={onToggleExercisePreviewer} />
      </Column>
    );
  })
);
