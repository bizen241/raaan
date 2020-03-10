import { Group as GroupIcon, Send } from "@material-ui/icons";
import React from "react";
import { EntityId } from "../../../shared/api/entities";
import { useEntity } from "../../hooks/useEntity";
import { useToggleState } from "../../hooks/useToggleState";
import { ExercisePlayer } from "../player/dialogs/ExercisePlayer";
import { Button, Card, Column, Property } from "../ui";

export const ContestViewer = React.memo<{
  contestId: EntityId<"Contest">;
}>(({ contestId }) => {
  const { entity: contest } = useEntity("Contest", contestId);

  const [isExercisePlayerOpen, onToggleExercisePlayer] = useToggleState();

  return (
    <Column>
      <Button color="primary" icon={<Send />} label="提出する" onClick={onToggleExercisePlayer} />
      <Card icon={<GroupIcon />} title={contest.title || "無題"}>
        <Property label="開始日時">{new Date(contest.startAt).toLocaleString()}</Property>
        <Property label="終了日時">{new Date(contest.finishAt).toLocaleString()}</Property>
      </Card>
      <ExercisePlayer
        exerciseId={contest.exerciseId}
        contestId={contest.id}
        isOpen={isExercisePlayerOpen}
        onClose={onToggleExercisePlayer}
      />
    </Column>
  );
});
