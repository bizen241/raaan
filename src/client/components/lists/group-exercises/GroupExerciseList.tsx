import { IconButton, Link, TableCell, TableRow, Typography } from "@material-ui/core";
import { Event, Refresh } from "@material-ui/icons";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { SelectContestGroupDialog } from "../../dialogs/contests/SelectContestGroupDialog";
import { Column, Menu, MenuItem } from "../../ui";

export const GroupExerciseList = createEntityList("GroupExercise")(
  React.memo(({ entity: groupExercise, onReload }) => {
    const [isContestDialogOpen, onToggleContestDialog] = useToggleState();

    const { entity: exerciseSummary } = useEntity("ExerciseSummary", groupExercise.exerciseSummaryId, false);
    if (exerciseSummary === undefined) {
      return (
        <Column>
          <IconButton onClick={onReload}>
            <Refresh />
          </IconButton>
        </Column>
      );
    }

    return (
      <TableRow>
        <TableCell>
          <Column>
            <Link
              color="textPrimary"
              underline="always"
              component={RouterLink}
              to={`/exercises/${exerciseSummary.exerciseId}`}
            >
              <Typography>{exerciseSummary && exerciseSummary.title}</Typography>
            </Link>
          </Column>
        </TableCell>
        <TableCell padding="checkbox">
          <Menu>
            <MenuItem icon={<Event />} label="セッションを作成" onClick={onToggleContestDialog} />
          </Menu>
        </TableCell>
        <SelectContestGroupDialog
          exerciseId={exerciseSummary.exerciseId}
          isOpen={isContestDialogOpen}
          onClose={onToggleContestDialog}
        />
      </TableRow>
    );
  })
);
