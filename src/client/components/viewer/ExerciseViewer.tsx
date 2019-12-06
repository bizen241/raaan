import { PlayArrow, PlaylistAdd } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { PlaylistItemsDialog } from "../dialogs/exercises/PlaylistItemsDialog";
import { ExercisePlayer } from "../player/dialogs/ExercisePlayer";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { ExerciseSummaryViewer } from "./ExerciseSummaryViewer";
import { SubmissionSummaryViewer } from "./SubmissionSummaryViewer";

export const ExerciseViewer = withEntity("Exercise")(
  React.memo(({ entity: exercise }) => {
    const currentUser = useContext(UserContext);

    const [isExercisePlayerOpen, onToggleExercisePlayer] = useToggleState();
    const [isPlaylistDialogOpen, onTogglePlaylistDialog] = useToggleState();

    const isGuest = currentUser.permission === "Guest";

    return (
      <Column>
        <Button color="primary" icon={<PlayArrow />} label="始める" onClick={onToggleExercisePlayer} />
        {!isGuest && <Button icon={<PlaylistAdd />} label="プレイリストに追加" onClick={onTogglePlaylistDialog} />}
        <ExerciseSummaryViewer entityId={exercise.summaryId} />
        {!isGuest && (
          <SubmissionSummaryViewer
            params={{
              submitterId: currentUser.id,
              exerciseId: exercise.id
            }}
          />
        )}
        <ExercisePlayer exerciseId={exercise.id} isOpen={isExercisePlayerOpen} onClose={onToggleExercisePlayer} />
        <PlaylistItemsDialog exerciseId={exercise.id} isOpen={isPlaylistDialogOpen} onClose={onTogglePlaylistDialog} />
      </Column>
    );
  })
);
