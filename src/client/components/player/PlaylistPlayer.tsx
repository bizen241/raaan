import * as React from "react";
import { DialogProps } from "../dialogs";
import { ExercisePlayer } from "./ExercisePlayer";

export const PlaylistPlayer = React.memo<
  {
    exerciseIds: string[];
  } & DialogProps
>(({ exerciseIds, isOpen, onClose }) => {
  const onNext = () => {
    console.log("next");
  };

  return <ExercisePlayer exerciseId={exerciseIds[0]} onNext={onNext} isOpen={isOpen} onClose={onClose} />;
});
