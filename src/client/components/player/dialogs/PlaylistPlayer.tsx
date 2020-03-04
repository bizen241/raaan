import { CircularProgress } from "@material-ui/core";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { EntityId, PlaylistItem } from "../../../../shared/api/entities";
import { actions, useSelector } from "../../../reducers";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./createPlayerDialog";

export const PlaylistPlayer = createPlayerDialog<{
  playlistItems: PlaylistItem[];
  startIndex: number;
}>(
  React.memo(({ playlistItems, startIndex, onClose }) => {
    const dispatch = useDispatch();

    const [cursor, setCursor] = useState(0);
    const exerciseIds = useMemo(() => {
      const ids: EntityId<"Exercise">[] = [];

      playlistItems.slice(startIndex).forEach(playlist => playlist.exerciseId && ids.push(playlist.exerciseId));

      return ids;
    }, []);

    const currentExerciseId = exerciseIds[cursor];
    const nextExerciseId = exerciseIds[cursor + 1];

    const exerciseMap = useSelector(state => state.cache.get.Exercise);
    const currentExercise = exerciseMap[currentExerciseId];
    const nextExercise = exerciseMap[nextExerciseId || currentExerciseId];

    const exerciseStatusMap = useSelector(state => state.api.get.Exercise);
    const currentExerciseStatus = exerciseStatusMap[currentExerciseId];

    useEffect(() => {
      if (currentExercise === undefined) {
        dispatch(actions.api.get("Exercise", currentExerciseId));
      }
      if (nextExercise === undefined) {
        dispatch(actions.api.get("Exercise", nextExerciseId));
      }
    }, [cursor]);

    const hasNext = nextExerciseId !== undefined;
    const onNext = useCallback(() => setCursor(s => s + 1), []);

    if (currentExercise === undefined) {
      if (currentExerciseStatus === 404) {
        onNext();
      }

      return <CircularProgress />;
    }

    return <SubmissionManager exercise={currentExercise} hasNext={hasNext} onNext={onNext} onClose={onClose} />;
  })
);
