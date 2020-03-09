import { Event } from "@material-ui/icons";
import React from "react";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useToggleState } from "../../../hooks/useToggleState";
import { SelectContestGroupDialog } from "../../dialogs/contests/SelectContestGroupDialog";
import { Link, Menu, MenuItem, TableRow } from "../../ui";

export const GroupExerciseList = createEntityList("GroupExercise")(
  React.memo(({ entity: groupExercise }) => {
    const [isContestDialogOpen, onToggleContestDialog] = useToggleState();

    const { entity: exerciseSummary } = useEntity("ExerciseSummary", groupExercise.exerciseSummaryId);

    return (
      <TableRow
        action={
          <Menu>
            <MenuItem icon={<Event />} label="セッションを作成" onClick={onToggleContestDialog} />
          </Menu>
        }
      >
        <Link label={exerciseSummary.title} to={`/exercises/${exerciseSummary.exerciseId}`} />
        <SelectContestGroupDialog
          exerciseId={exerciseSummary.exerciseId}
          isOpen={isContestDialogOpen}
          onClose={onToggleContestDialog}
        />
      </TableRow>
    );
  })
);
