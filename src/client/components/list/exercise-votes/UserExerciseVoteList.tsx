import { TableCell, TableRow, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import * as React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { DeleteExerciseVoteDialog } from "../../dialogs/exercise-votes/DeleteExerciseVoteDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const UserExerciseVoteList = createEntityList("ExerciseVote")(
  React.memo(({ entity: exerciseVote }) => {
    const [isDeleteDialogOpen, onToggleDeleteDialog] = useToggleState();

    const { entity: exerciseSummary } = useEntity("ExerciseSummary", exerciseVote.targetSummaryId);
    if (exerciseSummary === undefined) {
      return null;
    }

    return (
      <TableRow hover>
        <TableCell>
          <Column>
            <Typography>{exerciseSummary.title}</Typography>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <Menu>
            <MenuItem icon={<Delete />} label="削除" onClick={onToggleDeleteDialog} />
          </Menu>
        </TableCell>
        <DeleteExerciseVoteDialog
          exerciseVoteId={exerciseVote.id}
          isOpen={isDeleteDialogOpen}
          onClose={onToggleDeleteDialog}
        />
      </TableRow>
    );
  })
);
