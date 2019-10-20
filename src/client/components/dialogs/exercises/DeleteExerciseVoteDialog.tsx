import { Typography } from "@material-ui/core";
import { Delete, HowToVote } from "@material-ui/icons";
import * as React from "react";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ExerciseVote } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { UserContext } from "../../project/Context";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const DeleteExerciseVoteDialog = createDialog<{
  exerciseId: string;
  exerciseVoteId: string;
}>(
  React.memo(({ exerciseId: targetId, exerciseVoteId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onDelete = () => {
      dispatch(actions.api.delete("ExerciseVote", exerciseVoteId));
    };
    const { deleteStatus } = useEntity<ExerciseVote>("ExerciseVote", exerciseVoteId);
    useEffect(() => {
      if (deleteStatus === 200) {
        dispatch(
          actions.cache.search<ExerciseVote>(
            "ExerciseVote",
            {
              voterId: currentUser.id,
              targetId
            },
            {
              ids: [],
              entities: {},
              count: 0
            }
          )
        );
        dispatch(actions.cache.purge("ExerciseVote", exerciseVoteId));

        onClose();
      }
    }, [deleteStatus]);

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
