import React, { useMemo, useState } from "react";
import { PlaylistItem } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/useEntity";
import { Loading } from "../../project/Loading";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./createPlayerDialog";

export const PlaylistPlayer = createPlayerDialog<{
  playlistItems: PlaylistItem[];
  startIndex: number;
}>(
  React.memo(({ playlistItems, startIndex, onClose }) => {
    const [cursor, setCursor] = useState(0);
    const exerciseIds = useMemo(() => {
      const ids: string[] = [];

      playlistItems.slice(startIndex).forEach(({ exerciseId }) => exerciseId && ids.push(exerciseId));

      return ids;
    }, []);

    const currentExerciseId = exerciseIds[cursor];
    const nextExerciseId = exerciseIds[cursor + 1];

    const { entity: currentExercise, ...currentExerciseProps } = useEntity("Exercise", currentExerciseId);
    useEntity("Exercise", nextExerciseId || currentExerciseId);

    const hasNext = exerciseIds[cursor + 1] !== undefined;
    const onNext = () => {
      setCursor(s => s + 1);
    };

    if (currentExercise === undefined) {
      if (currentExerciseProps.getStatus === 404) {
        onNext();
      }

      return <Loading {...currentExerciseProps} />;
    }

    return <SubmissionManager exercise={currentExercise} hasNext={hasNext} onNext={onNext} onClose={onClose} />;
  })
);
