import { CircularProgress } from "@material-ui/core";
import * as React from "react";
import { Exercise } from "../../../../shared/api/entities";
import { useEntity } from "../../../hooks/entity";
import { DialogProps } from "../../dialogs";
import { AttemptMessage } from "../renderers/AttemptMessage";
import { SubmissionManager } from "./SubmissionManager";

export const ExerciseManager = React.memo<
  {
    exerciseId: string;
    hasNext?: boolean;
    onNext?: () => void;
  } & DialogProps
>(({ exerciseId, hasNext, onNext, isOpen, onClose }) => {
  const { entity: exercise } = useEntity<Exercise>("Exercise", exerciseId);

  if (exercise === undefined) {
    return <AttemptMessage icon={<CircularProgress />} title="ロード中です" onClose={onClose} />;
  }

  return (
    <SubmissionManager
      exerciseId={exerciseId}
      exercise={exercise}
      hasNext={hasNext}
      onNext={onNext}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
});
