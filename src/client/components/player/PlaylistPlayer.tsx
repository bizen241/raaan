import * as React from "react";
import { useState } from "react";
import { PlaylistItem } from "../../../shared/api/entities";
import { ExerciseManager } from "./ExerciseManager";
import { createPlayerDialog } from "./PlayerDialog";

export const PlaylistPlayer = createPlayerDialog<{
  playlistItems: PlaylistItem[];
}>(
  React.memo(({ playlistItems, isOpen, onClose }) => {
    const [cursor, setCursor] = useState(0);
    const [exerciseIds] = useState(() => {
      const ids: string[] = [];

      playlistItems.forEach(({ exerciseId }) => exerciseId && ids.push(exerciseId));

      return ids;
    });

    const onNext = () => {
      setCursor(s => s + 1);
    };

    return (
      <ExerciseManager
        exerciseId={exerciseIds[cursor]}
        hasNext={true}
        onNext={onNext}
        isOpen={isOpen}
        onClose={onClose}
      />
    );
  })
);
