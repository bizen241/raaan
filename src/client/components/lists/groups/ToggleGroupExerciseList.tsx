import { Checkbox, TableCell, TableRow, Typography } from "@material-ui/core";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";

export const ToggleGroupExerciseList = createEntityList<
  "GroupMember",
  {
    exerciseId: EntityId<"Exercise">;
  }
>("GroupMember")(
  React.memo(({ entity: { groupSummaryId }, exerciseId }) => {
    const dispatch = useDispatch();

    const [isRequested, toggleRequestState] = useToggleState();

    const { entity: groupSummary } = useEntity("GroupSummary", groupSummaryId);
    const groupId = groupSummary && groupSummary.groupId;

    const { entities: groupExercises } = useSearch("GroupExercise", {
      exerciseId,
    });
    const foundGroupExercise =
      groupSummary && groupExercises.find((groupExercise) => groupExercise.groupId === groupId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundGroupExercise === undefined) {
        dispatch(
          actions.api.upload(
            "GroupExercise",
            generateLocalEntityId(),
            {
              groupId,
              exerciseId,
            },
            (uploadResponse) => {
              dispatch(
                actions.cache.add(
                  "GroupExercise",
                  {
                    exerciseId,
                  },
                  uploadResponse
                )
              );
              toggleRequestState();
            }
          )
        );
      } else {
        dispatch(actions.api.delete("GroupExercise", foundGroupExercise.id, 0, toggleRequestState));
      }
    }, [groupExercises]);

    return (
      <TableRow hover onClick={groupId && !isRequested ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={foundGroupExercise !== undefined} disabled={groupId === undefined || isRequested} />
        </TableCell>
        <TableCell>
          <Typography>{(groupSummary && groupSummary.name) || "名無しのグループ"}</Typography>
        </TableCell>
      </TableRow>
    );
  })
);
