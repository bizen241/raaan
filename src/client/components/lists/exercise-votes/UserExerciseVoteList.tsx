import { Delete } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteExerciseVoteDialog } from "../../dialogs/exercise-votes/DeleteExerciseVoteDialog";
import { Link, Menu, MenuItem, TableRow } from "../../ui";

export const UserExerciseVoteList = createEntityList("ExerciseVote")(
  React.memo(({ entity: exerciseVote }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: exerciseSummary } = useEntity("ExerciseSummary", exerciseVote.targetSummaryId);

    return (
      <TableRow
        action={
          <Menu>
            <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
          </Menu>
        }
      >
        <Link label={exerciseSummary.title} to={exerciseSummary.exerciseId} />
        <DeleteExerciseVoteDialog
          exerciseVoteId={exerciseVote.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
