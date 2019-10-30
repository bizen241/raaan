import { Typography } from "@material-ui/core";
import { Delete, HowToVote } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog, dialogTimeout } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, Card, DialogContent } from "../../ui";

export const DeleteExerciseVoteDialog = createDialog<{
  exerciseVoteId: string;
}>(
  React.memo(({ exerciseVoteId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("ExerciseVote", exerciseVoteId, dialogTimeout, onClose));
    };

    return (
      <DialogContent title="投票の取り消し" onClose={onClose}>
        <Card icon={<HowToVote />} title="投票の取り消し">
          <Typography>投票を取り消します。</Typography>
        </Card>
        <Button icon={<Delete />} label="投票を取り消す" onClick={onDelete} />
      </DialogContent>
    );
  })
);
