import { Typography } from "@material-ui/core";
import { ArrowDownward, ArrowUpward, HowToVote } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { EntityId } from "../../../../shared/api/entities";
import { createDialog } from "../../../enhancers/createDialog";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { actions } from "../../../reducers";
import { generateLocalEntityId } from "../../../reducers/entity";
import { Button, Card } from "../../ui";

export const UploadExerciseVoteDialog = createDialog<{
  exerciseId: EntityId<"Exercise">;
}>()(
  React.memo(({ t }) => t("投票する")),
  React.memo(({ exerciseId: targetId, onClose }) => {
    const dispatch = useDispatch();
    const { currentUserId } = useCurrentUser();

    const onUpload = (isUp: boolean) => {
      dispatch(
        actions.api.upload(
          "ExerciseVote",
          generateLocalEntityId(),
          {
            targetId,
            isUp
          },
          uploadResponse => {
            dispatch(
              actions.cache.add(
                "ExerciseVote",
                {
                  voterId: currentUserId,
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
      <>
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
      </>
    );
  })
);
