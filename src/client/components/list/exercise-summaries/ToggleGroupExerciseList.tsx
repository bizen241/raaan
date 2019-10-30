import { Checkbox, TableCell, TableRow } from "@material-ui/core";
import { createContext, useCallback, useContext } from "react";
import * as React from "react";
import { useDispatch } from "react-redux";
import { ExerciseSummary, GroupExercise } from "../../../../shared/api/entities";
import { createEntityList } from "../../../enhancers/createEntityList";
import { useSearch } from "../../../hooks/useSearch";
import { useToggleState } from "../../../hooks/useToggleState";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { Column } from "../../ui";

export const GroupContext = createContext<string | undefined>(undefined);

export const ToggleGroupExerciseList = createEntityList<ExerciseSummary>({ entityType: "ExerciseSummary" })(
  React.memo(({ entity: { exerciseId, title } }) => {
    const dispatch = useDispatch();
    const groupId = useContext(GroupContext);
    if (groupId === undefined) {
      return null;
    }

    const [isRequested, toggleRequestState] = useToggleState();

    const { entities: groupExercises } = useSearch<GroupExercise>("GroupExercise", {
      groupId
    });
    const foundGroupExercise = groupExercises.find(groupExercise => groupExercise.exerciseId === exerciseId);

    const onClick = useCallback(() => {
      toggleRequestState();

      if (foundGroupExercise === undefined) {
        dispatch(
          actions.api.upload<GroupExercise>(
            "GroupExercise",
            generateBufferId(),
            {
              groupId,
              exerciseId
            },
            uploadResponse => {
              dispatch(
                actions.cache.add<GroupExercise>(
                  "GroupExercise",
                  {
                    groupId
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
      <TableRow hover onClick={!isRequested ? onClick : undefined}>
        <TableCell padding="checkbox">
          <Checkbox checked={foundGroupExercise !== undefined} disabled={isRequested} />
        </TableCell>
        <TableCell>
          <Column>{title || "無題"}</Column>
        </TableCell>
      </TableRow>
    );
  })
);
