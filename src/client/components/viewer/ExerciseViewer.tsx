import { PlayArrow, PlaylistAdd } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { Exercise } from "../../../shared/api/entities";
import { withEntity } from "../../enhancers/withEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { PlaylistDialog } from "../dialogs/exercises/PlaylistItemsDialog";
import { ExercisePlayer } from "../player/dialogs/ExercisePlayer";
import { UserContext } from "../project/Context";
import { Button, Column } from "../ui";
import { ExerciseSummaryViewer } from "./ExerciseSummaryViewer";
import { SubmissionSummaryViewer } from "./SubmissionSummaryViewer";

export const ExerciseViewer = withEntity<Exercise>({ entityType: "Exercise" })(
  React.memo(({ entity: exercise, entityId: exerciseId }) => {
    const currentUser = useContext(UserContext);

    const [isExercisePlayerOpen, onToggleExercisePlayer] = useToggleState();
    const [isPlaylistDialogOpen, onTogglePlaylistDialog] = useToggleState();

    const isGuest = currentUser.permission === "Guest";

    return (
      <Column>
        <Button color="primary" icon={<PlayArrow />} label="始める" onClick={onToggleExercisePlayer} />
        {!isGuest && <Button icon={<PlaylistAdd />} label="プレイリストに追加" onClick={onTogglePlaylistDialog} />}
        <Column pb={1}>
          <ExerciseSummaryViewer entityId={exercise.summaryId} />
        </Column>
        {!isGuest && (
          <Column pb={1}>
            <SubmissionSummaryViewer submitterId={currentUser.id} exerciseId={exerciseId} />
          </Column>
        )}
        <ExercisePlayer exerciseId={exerciseId} isOpen={isExercisePlayerOpen} onClose={onToggleExercisePlayer} />
        <PlaylistDialog exerciseId={exerciseId} isOpen={isPlaylistDialogOpen} onClose={onTogglePlaylistDialog} />
      </Column>
    );
  })
);
