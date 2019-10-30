import { Typography } from "@material-ui/core";
import { ArrowDownward, ArrowUpward, HowToVote } from "@material-ui/icons";
import * as React from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { ExerciseVote } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { actions } from "../../../reducers";
import { generateBufferId } from "../../../reducers/buffers";
import { UserContext } from "../../project/Context";
import { Button, Card, DialogContent } from "../../ui";

export const UploadExerciseVoteDialog = createDialog<{
  exerciseId: string;
}>(
  React.memo(({ exerciseId: targetId, onClose }) => {
    const dispatch = useDispatch();
    const currentUser = useContext(UserContext);

    const onUpload = (isUp: boolean) => {
      const bufferId = generateBufferId();

      dispatch(
        actions.api.upload<ExerciseVote>(
          "ExerciseVote",
          bufferId,
          {
            targetId,
            isUp
          },
          uploadResponse => {
            dispatch(
              actions.cache.add<ExerciseVote>(
                "ExerciseVote",
                {
                  voterId: currentUser.id,
                  targetId
                },
                uploadResponse
              )
            );

            onClose();
          }
        )
      );
    };

    return (
      <DialogContent title="投票する" onClose={onClose}>
        <Card icon={<HowToVote />} title="投票する">
          <Typography>内容を選んでください。</Typography>
        </Card>
        <Button icon={<ArrowUpward />} label="賛成" onClick={() => onUpload(true)} />
        <Button
          icon={<ArrowDownward color="error" />}
          label="反対"
          labelColor="error"
          onClick={() => onUpload(false)}
        />
      </DialogContent>
    );
  })
);
