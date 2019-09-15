import * as React from "react";
import { useMemo, useState } from "react";
import { PlaylistItem } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/entity";
import { SubmissionManager } from "../managers/SubmissionManager";
import { createPlayerDialog } from "./PlayerDialog";

export const PlaylistPlayer = createPlayerDialog<{
  playlistItems: PlaylistItem[];
}>(
  React.memo(({ playlistItems, onClose }) => {
    const [cursor, setCursor] = useState(0);
    const exerciseIds = useMemo(() => {
      const ids: string[] = [];

      playlistItems.forEach(({ exerciseId }) => exerciseId && ids.push(exerciseId));

      return ids;
    }, []);

    const currentExerciseId = exerciseIds[cursor];
    const nextExerciseId = exerciseIds[cursor + 1];
    useEntity("Exercise", nextExerciseId || currentExerciseId);

    const hasNext = exerciseIds[cursor + 1] !== undefined;
    const onNext = () => {
      setCursor(s => s + 1);
    };

    return <SubmissionManager entityId={currentExerciseId} hasNext={hasNext} onNext={onNext} onClose={onClose} />;
  })
);
