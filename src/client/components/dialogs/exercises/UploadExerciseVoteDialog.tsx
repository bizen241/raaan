import { Typography } from "@material-ui/core";
import { ArrowDownward, ArrowUpward, HowToVote } from "@material-ui/icons";
import * as React from "react";
import { useContext, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { ExerciseVote } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useEntity } from "../../../hooks/useEntity";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, DialogActions, DialogHeader, DialogMessage } from "../../ui";

export const UploadExerciseVoteDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId: targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const bufferId = useMemo(() => generateBufferId(), []);
    const onUpvote = () => {
      dispatch(
        actions.api.upload<ExerciseVote>("ExerciseVote", bufferId, {
          targetId,
          isUp: true
        })
      );
    };
    const onDownvote = () => {
      dispatch(
        actions.api.upload<ExerciseVote>("ExerciseVote", bufferId, {
          targetId,
          isUp: false
        })
      );
    };
    const { uploadStatus, uploadResponse } = useEntity<ExerciseVote>("ExerciseVote", bufferId);
    useEffect(() => {
      if (uploadStatus === 200 && uploadResponse !== undefined) {
        dispatch(
          actions.cache.search<ExerciseVote>(
            "ExerciseVote",
            {
              voterId: currentUser.id,
              targetId
            },
            {
              ids: [Object.keys(uploadResponse.ExerciseVote)[0]],
              entities: {},
              count: 1
            }
          )
        );

        onClose();
      }
    }, [uploadStatus]);

    return (
      <>
        <DialogHeader onClose={onClose}>
          <Typography>投票する</Typography>
        </DialogHeader>
        <DialogMessage icon={<HowToVote />}>
          <Typography>内容を選んでください。</Typography>
        </DialogMessage>
        <DialogActions>
          <Button icon={<ArrowUpward />} label="賛成" onClick={onUpvote} />
          <Button icon={<ArrowDownward color="error" />} label="反対" labelColor="error" onClick={onDownvote} />
        </DialogActions>
      </>
    );
  })
);
