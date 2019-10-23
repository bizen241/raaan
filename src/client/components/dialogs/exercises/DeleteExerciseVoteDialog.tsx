import { Typography } from "@material-ui/core";
import { Delete, HowToVote } from "@material-ui/icons";
import * as React from "react";
import { useDispatch } from "react-redux";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const DeleteExerciseVoteDialog = createDialog<{
  exerciseVoteId: string;
}>(
  React.memo(({ exerciseVoteId, onClose }) => {
    const dispatch = useDispatch();

    const onDelete = () => {
      dispatch(actions.api.delete("ExerciseVote", exerciseVoteId, onClose));
    };

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>投票の取り消し</Typography>
        </DialogHeader>
        <DialogMessage icon={<HowToVote />}>
          <Typography>投票を取り消します。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<Delete color="error" />} label="投票を取り消す" labelColor="error" onClick={onDelete} />
          <Button label="キャンセル" onClick={onClose} />
        </DialogActions>
      </>
    );
  })
);
