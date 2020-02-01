import { Checkbox, TableCell, TableRow, Typography } from "@material-ui/core";
import { createContext, useCallback, useContext } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useEntity } from "../../../hooks/useEntity";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";

export const ExerciseContext = createContext<string | undefined>(undefined);

export const ToggleGroupExerciseList = createEntityList("GroupMember")(
  React.memo(({ entity: { groupSummaryId } }) => {
    const dispatch = useDispatch();
    const exerciseId = useContext(ExerciseContext);
    if (exerciseId === undefined) {
      throw new Error("exerciseId is not defined");
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entity: groupSummary } = useEntity("GroupSummary", groupSummaryId);
    const groupId = groupSummary && groupSummary.groupId;

    const { entities: groupExercises } = useSearch("GroupExercise", {
      exerciseId
    });
    const foundGroupExercise = groupSummary && groupExercises.find(groupExercise => groupExercise.groupId === groupId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundGroupExercise === undefined) {
        dispatch(
          actions.api.upload(
            "GroupExercise",
            generateBufferId(),
            {
              groupId,
              exerciseId
            },
            uploadResponse => {
              dispatch(
                actions.cache.add(
                  "GroupExercise",
                  {
                    exerciseId
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
